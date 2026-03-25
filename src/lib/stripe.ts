import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
})

export const PLANS = {
  BUSINESS: {
    name: "Business",
    price: 29,
    priceId: process.env.STRIPE_PRICE_BUSINESS!,
    features: ["1 business listing", "3 routes", "Basic analytics", "QR check-ins"],
  },
  STARTER: {
    name: "Starter",
    price: 299,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    features: ["5 routes", "50 businesses", "Full analytics", "BID reports", "Priority support"],
  },
  GROWTH: {
    name: "Growth",
    price: 499,
    priceId: process.env.STRIPE_PRICE_GROWTH!,
    features: ["Unlimited routes", "Unlimited businesses", "White-label", "API access", "Custom domain"],
  },
} as const
