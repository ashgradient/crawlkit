import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { stripe, PLANS } from "@/lib/stripe"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { plan } = await req.json()
    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user?.email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [{ price: planConfig.priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
        plan,
      },
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.error("[stripe checkout]", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
