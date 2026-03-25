import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const route = await prisma.route.findUnique({
    where: { id },
    include: { org: true },
  })

  if (!route || route.org.ownerId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const updated = await prisma.route.update({
    where: { id },
    data: {
      ...(body.isPublished !== undefined ? { isPublished: body.isPublished } : {}),
      ...(body.name ? { name: body.name } : {}),
      ...(body.description ? { description: body.description } : {}),
    },
  })

  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  const route = await prisma.route.findUnique({
    where: { id },
    include: { org: true },
  })

  if (!route || route.org.ownerId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.route.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
