import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { PricingSection } from "@/components/landing/pricing-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { SocialProof } from "@/components/landing/social-proof"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <SocialProof />
        <PricingSection />
      </main>
      <Footer />
    </>
  )
}
