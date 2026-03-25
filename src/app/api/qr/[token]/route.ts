import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const qrCode = await prisma.qRCode.findUnique({
    where: { token },
    include: {
      business: {
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          address: true,
          imageUrl: true,
        },
      },
      stop: {
        include: {
          route: { select: { id: true, name: true, slug: true, city: true, totalStops: true } },
        },
      },
    },
  })

  if (!qrCode) {
    return NextResponse.json({ error: "QR code not found" }, { status: 404 })
  }

  return NextResponse.json(qrCode)
}
