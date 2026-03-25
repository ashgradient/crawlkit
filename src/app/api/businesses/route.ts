import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  category: z.string(),
  address: z.string().min(5),
  description: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  website: z.string().optional(),
  phone: z.string().optional(),
  orgId: z.string(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  // Verify org ownership
  const org = await prisma.organization.findUnique({
    where: { id: parsed.data.orgId, ownerId: session.user.id },
  })
  if (!org) return NextResponse.json({ error: "Unauthorized" }, { status: 403 })

  const business = await prisma.business.create({
    data: {
      name: parsed.data.name,
      category: parsed.data.category,
      address: parsed.data.address,
      description: parsed.data.description,
      lat: parsed.data.lat,
      lng: parsed.data.lng,
      website: parsed.data.website,
      phone: parsed.data.phone,
      orgId: parsed.data.orgId,
    },
  })

  // Auto-generate QR code for this business
  await prisma.qRCode.create({
    data: { businessId: business.id },
  })

  return NextResponse.json(business)
}
