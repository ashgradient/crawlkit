import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="flex min-h-screen bg-[hsl(40,33%,97%)]">
      <DashboardSidebar user={session.user} />
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
