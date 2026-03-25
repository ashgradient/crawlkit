import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { slugify } from "@/lib/utils"

const createRouteSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  city: z.string().min(2),
  estimatedMinutes: z.number().default(60),
  stopIds: z.array(z.string()).optional(),
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get("city")
  const orgId = searchParams.get("orgId")

  const routes = await prisma.route.findMany({
    where: {
      isPublished: true,
      ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
      ...(orgId ? { orgId } : {}),
    },
    include: {
      stops: { include: { business: true } },
      org: { select: { name: true, slug: true } },
      _count: { select: { checkIns: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(routes)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const parsed = createRouteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error }, { status: 400 })
    }

    const { name, description, city, estimatedMinutes, stopIds } = parsed.data

    // Get user's org
    const org = await prisma.organization.findUnique({
      where: { ownerId: session.user.id },
    })
    if (!org) {
      return NextResponse.json({ error: "No organization found. Please set up your org first." }, { status: 400 })
    }

    const slug = slugify(name)

    const route = await prisma.route.create({
      data: {
        name,
        slug,
        description,
        city,
        estimatedMinutes,
        totalStops: stopIds?.length ?? 0,
        orgId: org.id,
        stops: stopIds
          ? {
              create: stopIds.map((businessId, i) => ({
                order: i + 1,
                businessId,
              })),
            }
          : undefined,
      },
      include: { stops: { include: { business: true } } },
    })

    return NextResponse.json(route)
  } catch (error) {
    console.error("[routes POST]", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
