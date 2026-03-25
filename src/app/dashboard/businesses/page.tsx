export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { BusinessesManager } from "@/components/dashboard/businesses-manager"

export default async function BusinessesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { ownerId: session.user.id },
  })

  const businesses = org
    ? await prisma.business.findMany({
        where: { orgId: org.id },
        include: { _count: { select: { checkIns: true } } },
        orderBy: { name: "asc" },
      })
    : []

  return <BusinessesManager businesses={businesses} orgId={org?.id} />
}
