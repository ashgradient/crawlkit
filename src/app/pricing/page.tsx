import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PricingSection } from "@/components/landing/pricing-section"

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-slate-DEFAULT mb-3">Simple pricing</h1>
          <p className="text-slate-DEFAULT/60 max-w-lg mx-auto">
            Most BID programs start with Starter. Scale when your district grows.
          </p>
        </div>
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
