export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { QRCodesManager } from "@/components/dashboard/qrcodes-manager"

export default async function QRCodesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { ownerId: session.user.id },
  })

  const qrCodes = org
    ? await prisma.qRCode.findMany({
        where: { business: { orgId: org.id } },
        include: {
          business: { select: { name: true, address: true } },
          _count: { select: { checkIns: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    : []

  return <QRCodesManager qrCodes={qrCodes} />
}
