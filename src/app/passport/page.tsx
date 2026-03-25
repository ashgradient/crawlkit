export const dynamic = "force-dynamic"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { PassportView } from "@/components/passport/passport-view"

export default async function PassportPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login?callbackUrl=/passport")

  let passport = await prisma.passport.findUnique({
    where: { userId: session.user.id },
    include: {
      stamps: {
        include: {
          route: {
            select: { name: true, city: true, totalStops: true },
          },
        },
        orderBy: { completedAt: "desc" },
      },
    },
  })

  // Create passport if not exists
  if (!passport) {
    passport = await prisma.passport.create({
      data: { userId: session.user.id },
      include: {
        stamps: { include: { route: { select: { name: true, city: true, totalStops: true } } } },
      },
    })
  }

  const totalCheckIns = await prisma.checkIn.count({ where: { userId: session.user.id } })
  const uniqueBusinesses = await prisma.checkIn.groupBy({
    by: ["businessId"],
    where: { userId: session.user.id },
  })

  return (
    <PassportView
      user={{ name: session.user.name, image: session.user.image }}
      passport={passport}
      totalCheckIns={totalCheckIns}
      uniqueBusinesses={uniqueBusinesses.length}
    />
  )
}
