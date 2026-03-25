import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/db"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("[webhook] Invalid signature", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session
      const { userId, plan } = session.metadata ?? {}

      if (userId && plan) {
        const planMap: Record<string, string> = {
          BUSINESS: "BUSINESS",
          STARTER: "STARTER",
          GROWTH: "GROWTH",
        }

        await prisma.organization.updateMany({
          where: { ownerId: userId },
          data: {
            plan: (planMap[plan] as any) ?? "STARTER",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
          },
        })
      }
      break
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription
      await prisma.organization.updateMany({
        where: { stripeSubscriptionId: sub.id },
        data: { plan: "FREE" },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
