import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { slugify } from "@/lib/utils"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  slug: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const slug = parsed.data.slug || slugify(parsed.data.name)

  try {
    const existing = await prisma.organization.findUnique({ where: { ownerId: session.user.id } })

    if (existing) {
      const org = await prisma.organization.update({
        where: { ownerId: session.user.id },
        data: { name: parsed.data.name, city: parsed.data.city, slug },
      })
      return NextResponse.json(org)
    } else {
      const org = await prisma.organization.create({
        data: {
          name: parsed.data.name,
          city: parsed.data.city,
          slug,
          ownerId: session.user.id,
        },
      })
      return NextResponse.json(org)
    }
  } catch (e: any) {
    if (e.code === "P2002") {
      return NextResponse.json({ error: "That URL slug is taken. Try another." }, { status: 400 })
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
