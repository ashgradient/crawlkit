export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { RoutesList } from "@/components/dashboard/routes-list"

export default async function RoutesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const org = await prisma.organization.findUnique({
    where: { ownerId: session.user.id },
  })

  const routes = org
    ? await prisma.route.findMany({
        where: { orgId: org.id },
        include: {
          stops: { include: { business: true }, orderBy: { order: "asc" } },
          _count: { select: { checkIns: true } },
        },
        orderBy: { createdAt: "desc" },
      })
    : []

  const businesses = org
    ? await prisma.business.findMany({
        where: { orgId: org.id },
        orderBy: { name: "asc" },
      })
    : []

  return <RoutesList routes={routes} businesses={businesses} orgId={org?.id} />
}
