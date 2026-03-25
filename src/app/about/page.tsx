import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { MapPin, Users, BarChart3, QrCode } from "lucide-react"

export const metadata = {
  title: "About — CrawlKit",
  description: "CrawlKit helps BIDs and tourism boards build themed neighborhood crawls with QR check-ins and analytics.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-terracotta-DEFAULT rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-mono text-sm text-terracotta-DEFAULT font-medium tracking-wider uppercase">About CrawlKit</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-slate-DEFAULT mb-4">
              We help neighborhoods prove they work.
            </h1>
            <p className="text-lg text-slate-DEFAULT/60 leading-relaxed">
              CrawlKit gives Business Improvement Districts, tourism boards, and local chambers the tools to create
              themed walking routes — and the data to prove those routes drive foot traffic and revenue.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-[#FAF8F5] rounded-2xl border border-border p-8 mb-10">
            <h2 className="font-display text-2xl font-bold text-slate-DEFAULT mb-3">The problem we&apos;re solving</h2>
            <p className="text-slate-DEFAULT/70 leading-relaxed mb-4">
              Local business programs spend millions creating walking tours, food crawls, and neighborhood events.
              But when the board asks &ldquo;did it work?&rdquo; — nobody has a real answer.
            </p>
            <p className="text-slate-DEFAULT/70 leading-relaxed">
              CrawlKit provides QR + GPS check-ins at every stop, a digital passport consumers love, and analytics
              dashboards that turn foot traffic into board-ready ROI reports.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <QrCode className="w-6 h-6 text-terracotta-DEFAULT" />,
                title: "QR Check-ins",
                desc: "Every stop. Every scan. Real proof of participation.",
              },
              {
                icon: <Users className="w-6 h-6 text-mint-DEFAULT" />,
                title: "Digital Passport",
                desc: "Collectors keep coming back. Stamps become social proof.",
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-slate-DEFAULT" />,
                title: "Analytics",
                desc: "Route conversion, dwell time, top stops — board-ready.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-border p-5">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-display font-bold text-slate-DEFAULT mb-1">{item.title}</h3>
                <p className="text-sm text-slate-DEFAULT/60">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/signup"
              className="inline-block bg-terracotta-DEFAULT hover:bg-terracotta-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Get started free
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
