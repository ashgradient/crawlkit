import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Privacy Policy — CrawlKit",
  description: "How CrawlKit collects, uses, and protects your data.",
}

const sections = [
  {
    title: "Information We Collect",
    body: `We collect information you provide directly to us, such as when you create an account, add a business, or build a route. This includes your name, email address, and organization details.

We also collect usage data automatically, including check-in events (with optional GPS coordinates), device type, and pages visited. Check-in data is tied to your account to power the digital passport and analytics features.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use the information we collect to:
- Operate and improve the CrawlKit platform
- Power the digital passport and XP system
- Generate analytics for route and business owners
- Send transactional emails (receipts, account notices)
- Comply with legal obligations

We do not sell your personal data to third parties.`,
  },
  {
    title: "Data Sharing",
    body: `We share your data only in the following circumstances:
- With service providers who help us operate the platform (hosting, payments via Stripe, authentication)
- With route or business owners for analytics purposes — aggregated and anonymized where possible
- When required by law or to protect our rights

Route owners and Business Improvement Districts can see aggregate check-in counts and route performance. They cannot see individual user identities unless you opt in.`,
  },
  {
    title: "Cookies & Tracking",
    body: `We use cookies and similar technologies to maintain your session, remember your preferences, and understand how the app is used. You can disable cookies in your browser settings, but some features may not work correctly.`,
  },
  {
    title: "Data Retention",
    body: `We retain your account data as long as your account is active. Check-in history and passport data are retained indefinitely to power your passport and leaderboard features. You can request deletion of your account and associated data at any time by contacting us.`,
  },
  {
    title: "Your Rights",
    body: `Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, contact us at privacy@crawlkit.io. We will respond within 30 days.`,
  },
  {
    title: "Contact",
    body: `Questions about this policy? Email us at privacy@crawlkit.io.`,
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="font-mono text-sm text-terracotta-DEFAULT font-medium tracking-wider uppercase mb-3">Legal</p>
            <h1 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">Privacy Policy</h1>
            <p className="text-slate-DEFAULT/50 text-sm">Last updated: March 2026</p>
          </div>

          <div className="prose prose-slate max-w-none space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-bold text-slate-DEFAULT mb-3">{section.title}</h2>
                <div className="text-slate-DEFAULT/70 leading-relaxed whitespace-pre-line">{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
