import type { Metadata } from "next"
import { Space_Grotesk, Plus_Jakarta_Sans, DM_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@/components/analytics"
import { Providers } from "@/components/providers"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CrawlKit — Build a neighborhood crawl. Prove it works.",
  description:
    "Themed walking routes that drive foot traffic to local businesses. GPS + QR check-ins at each stop. Analytics on which routes convert to purchases.",
  openGraph: {
    title: "CrawlKit",
    description: "Build a neighborhood crawl. Prove it works.",
    url: "https://crawlkit.io",
    siteName: "CrawlKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrawlKit",
    description: "Build a neighborhood crawl. Prove it works.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${dmMono.variable}`}>
      <body>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
