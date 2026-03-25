export const dynamic = "force-dynamic"

import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import { CheckInClient } from "@/components/checkin/checkin-client"

export default async function CheckInPage({ params }: { params: Promise<{ token: string }> }) {
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
          website: true,
          phone: true,
        },
      },
      stop: {
        include: {
          route: {
            select: { id: true, name: true, slug: true, city: true, totalStops: true },
          },
        },
      },
    },
  })

  if (!qrCode) notFound()

  return (
    <CheckInClient
      qrToken={token}
      business={qrCode.business}
      route={qrCode.stop?.route ?? null}
      stopOrder={qrCode.stop?.order ?? null}
    />
  )
}
