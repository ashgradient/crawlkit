"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { PLANS } from "@/lib/stripe"

const plans = [
  {
    key: "BUSINESS",
    ...PLANS.BUSINESS,
    highlighted: false,
    cta: "Get started",
    audience: "Single business",
  },
  {
    key: "STARTER",
    ...PLANS.STARTER,
    highlighted: true,
    cta: "Start your district",
    audience: "BIDs & Tourism Boards",
  },
  {
    key: "GROWTH",
    ...PLANS.GROWTH,
    highlighted: false,
    cta: "Scale up",
    audience: "Large districts & multi-city",
  },
]

export function PricingSection() {
  return (
    <section className="py-24 bg-[hsl(40,33%,97%)]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">
            Pricing that scales with your district
          </h2>
          <p className="text-slate-DEFAULT/60 max-w-lg mx-auto">
            Most BID programs fit in the Starter plan. Upgrade when your program grows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "bg-slate-DEFAULT text-white shadow-2xl scale-105"
                  : "bg-white border border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-terracotta-DEFAULT text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-2">
                <span className={`text-xs font-mono uppercase tracking-wider ${
                  plan.highlighted ? "text-white/50" : "text-slate-DEFAULT/40"
                }`}>{plan.audience}</span>
              </div>

              <h3 className={`font-display font-bold text-xl mb-1 ${plan.highlighted ? "text-white" : "text-slate-DEFAULT"}`}>
                {plan.name}
              </h3>

              <div className={`flex items-baseline gap-1 mb-6 ${plan.highlighted ? "text-white" : "text-slate-DEFAULT"}`}>
                <span className="font-display text-4xl font-bold">${plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-slate-DEFAULT/50"}`}>/mo</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${
                      plan.highlighted ? "text-mint-DEFAULT" : "text-terracotta-DEFAULT"
                    }`} />
                    <span className={plan.highlighted ? "text-white/80" : "text-slate-DEFAULT/70"}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white"
                      : "bg-slate-DEFAULT hover:bg-slate-900 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-DEFAULT/40 mt-8">
          Enterprise plans from $999/mo. <Link href="/signup" className="underline hover:text-terracotta-DEFAULT">Contact us.</Link>
        </p>
      </div>
    </section>
  )
}
