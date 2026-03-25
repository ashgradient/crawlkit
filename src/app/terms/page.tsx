import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Terms of Service — CrawlKit",
  description: "CrawlKit Terms of Service — the rules for using the platform.",
}

const sections = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using CrawlKit, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the platform. We may update these terms from time to time; continued use constitutes acceptance of any changes.`,
  },
  {
    title: "Use of the Platform",
    body: `CrawlKit is a B2B SaaS platform for creating and managing neighborhood crawl routes. You may use CrawlKit only for lawful purposes and in accordance with these Terms.

You agree not to:
- Violate any applicable laws or regulations
- Impersonate another person or entity
- Interfere with the operation of the platform
- Attempt to gain unauthorized access to any system or data
- Use the platform to harass, abuse, or harm others`,
  },
  {
    title: "Accounts",
    body: `You are responsible for maintaining the confidentiality of your account credentials. You are responsible for all activity that occurs under your account. Notify us immediately at hello@crawlkit.io if you believe your account has been compromised.

You must be at least 18 years old to create an account.`,
  },
  {
    title: "Subscriptions and Billing",
    body: `Paid plans are billed monthly in advance. All fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days' notice. If you cancel, your plan remains active until the end of the current billing period.

Payments are processed by Stripe. By subscribing, you agree to Stripe's Terms of Service.`,
  },
  {
    title: "Content and Data",
    body: `You retain ownership of all business data, routes, and content you create on CrawlKit. By using the platform, you grant us a license to store, display, and process your content as necessary to provide the service.

You are responsible for ensuring your content does not violate any third-party rights or applicable laws.`,
  },
  {
    title: "Limitation of Liability",
    body: `CrawlKit is provided "as is" without warranty of any kind. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.

Our total liability to you for any claim arising from these terms or your use of CrawlKit shall not exceed the amount you paid us in the 3 months preceding the claim.`,
  },
  {
    title: "Termination",
    body: `We may suspend or terminate your account at any time for violation of these Terms, non-payment, or any other reason at our discretion. You may cancel your account at any time from your dashboard settings.`,
  },
  {
    title: "Governing Law",
    body: `These Terms are governed by the laws of the Netherlands. Any disputes shall be resolved in the courts of Rotterdam, Netherlands.`,
  },
  {
    title: "Contact",
    body: `Questions about these Terms? Contact us at hello@crawlkit.io.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="font-mono text-sm text-terracotta-DEFAULT font-medium tracking-wider uppercase mb-3">Legal</p>
            <h1 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">Terms of Service</h1>
            <p className="text-slate-DEFAULT/50 text-sm">Last updated: March 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-slate-DEFAULT mb-3">{section.title}</h2>
                <p className="text-slate-DEFAULT/70 leading-relaxed whitespace-pre-line">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
