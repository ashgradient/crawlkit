import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"

const schema = z.object({
  qrToken: z.string().optional(),
  businessId: z.string().optional(),
  routeId: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  method: z.enum(["QR", "GPS", "MANUAL"]).default("QR"),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const { qrToken, businessId: bodyBusinessId, routeId, lat, lng, method } = parsed.data

    let businessId = bodyBusinessId
    let qrCodeId: string | undefined

    // Resolve QR token to business
    if (qrToken) {
      const qrCode = await prisma.qRCode.findUnique({
        where: { token: qrToken },
        include: { business: true },
      })
      if (!qrCode) {
        return NextResponse.json({ error: "Invalid QR code" }, { status: 404 })
      }
      businessId = qrCode.businessId
      qrCodeId = qrCode.id
    }

    if (!businessId) {
      return NextResponse.json({ error: "Business ID required" }, { status: 400 })
    }

    // Anti-fraud: check for existing check-in
    const existing = await prisma.checkIn.findUnique({
      where: {
        userId_businessId_routeId: {
          userId: session.user.id,
          businessId,
          routeId: routeId ?? "",
        },
      },
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        alreadyCheckedIn: true,
        checkIn: existing,
        message: "Already checked in here!",
      })
    }

    const checkIn = await prisma.checkIn.create({
      data: {
        userId: session.user.id,
        businessId,
        routeId: routeId ?? null,
        qrCodeId: qrCodeId ?? null,
        lat: lat ?? null,
        lng: lng ?? null,
        method,
      },
      include: {
        business: { select: { name: true, category: true } },
        route: { select: { name: true, totalStops: true } },
      },
    })

    // Update passport if route is specified
    if (routeId) {
      await updatePassport(session.user.id, routeId, businessId)
    }

    return NextResponse.json({ success: true, checkIn, alreadyCheckedIn: false })
  } catch (error) {
    console.error("[checkin]", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

async function updatePassport(userId: string, routeId: string, _businessId: string) {
  try {
    // Count how many stops user has checked in on this route
    const route = await prisma.route.findUnique({
      where: { id: routeId },
      include: { stops: true },
    })
    if (!route) return

    const checkIns = await prisma.checkIn.count({
      where: {
        userId,
        routeId,
        businessId: { in: route.stops.map((s) => s.businessId) },
      },
    })

    // Ensure passport exists
    let passport = await prisma.passport.findUnique({ where: { userId } })
    if (!passport) {
      passport = await prisma.passport.create({ data: { userId } })
    }

    // Award XP for check-in
    await prisma.passport.update({
      where: { userId },
      data: { xp: { increment: 10 } },
    })

    // Award stamp if route complete
    if (checkIns >= route.totalStops && route.totalStops > 0) {
      await prisma.passportStamp.upsert({
        where: { passportId_routeId: { passportId: passport.id, routeId } },
        create: {
          passportId: passport.id,
          routeId,
          stopsCompleted: checkIns,
        },
        update: { stopsCompleted: checkIns },
      })
    }
  } catch (e) {
    console.error("[passport]", e)
  }
}
