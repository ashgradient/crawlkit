'use client'

import { useState } from 'react'
import { BarChart3, Target, Megaphone, Palette, Presentation, ExternalLink, Menu, Globe } from 'lucide-react'

const sections = [
  { id: 'research', icon: BarChart3, label: 'Research', color: '#D4622A' },
  { id: 'gtm', icon: Target, label: 'GTM Plan', color: '#2EC4B6' },
  { id: 'marketing', icon: Megaphone, label: 'Marketing', color: '#1E2D40' },
  { id: 'brand', icon: Palette, label: 'Brand', color: '#D4622A' },
  { id: 'pitch', icon: Presentation, label: 'Pitch Deck', color: '#2EC4B6' },
]

function ResearchSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1E2D40] font-display mb-2">Research</h1>
        <p className="text-[#718096]">Market validation, competitive analysis, and opportunity score.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Opportunity Score', value: '8/10', sub: 'Strong problem-market fit' },
          { label: 'TAM', value: '$3.8B', sub: '1,000 US BIDs × $3,800/yr' },
          { label: 'Competition', value: 'LOW', sub: 'No US SMB equivalent' },
        ].map((m, i) => (
          <div key={i} className={`rounded-xl p-5 ${i === 0 ? 'bg-[#D4622A] text-white' : 'bg-[#FAF8F5] border border-[#E3D9CE]'}`}>
            <div className={`text-xs uppercase tracking-wide mb-1 ${i === 0 ? 'text-white/70' : 'text-[#718096]'}`}>{m.label}</div>
            <div className={`text-3xl font-bold font-mono ${i === 0 ? 'text-white' : 'text-[#1E2D40]'}`}>{m.value}</div>
            <div className={`text-xs mt-1 ${i === 0 ? 'text-white/70' : 'text-[#718096]'}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Problem Statement</h2>
        <div className="space-y-3">
          {[
            { n: '1', t: 'No foot traffic visibility', d: "BIDs can't measure which marketing channels actually bring people through the door." },
            { n: '2', t: 'No coordinated discovery', d: "No easy way to create themed routes that visitors actually follow." },
            { n: '3', t: 'No ROI proof', d: "When the board asks 'is this working?' — there's no answer. Programs continue or die based on gut." },
          ].map((p) => (
            <div key={p.n} className="flex gap-4 p-4 bg-[#FAF8F5] rounded-lg">
              <span className="w-6 h-6 rounded-full bg-[#D4622A] text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">{p.n}</span>
              <div>
                <div className="font-semibold text-[#1E2D40] text-sm">{p.t}</div>
                <div className="text-[#718096] text-sm mt-0.5">{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Competitive Landscape</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3D9CE]">
                <th className="text-left py-2 text-[#718096] font-medium">Competitor</th>
                <th className="py-2 text-[#718096] font-medium">Focus</th>
                <th className="py-2 text-[#718096] font-medium">Weakness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE3]">
              {[
                { name: '⭐ CrawlKit', focus: 'B2B SaaS for BIDs, self-serve, no-app', weakness: '—', us: true },
                { name: 'Driftscape', focus: 'Tourism/DMOs, walking tours', weakness: 'Enterprise only, Canada-focused' },
                { name: 'PlayTours', focus: 'Event scavenger hunts', weakness: 'No recurring SaaS model' },
                { name: 'Eventzee', focus: 'Customizable scavenger hunts', weakness: 'Not local business-focused' },
                { name: 'Paper Maps', focus: 'Physical, no tracking', weakness: 'Zero analytics' },
              ].map((c, i) => (
                <tr key={i} className={c.us ? 'bg-[#D4622A]/5' : ''}>
                  <td className={`py-3 font-medium ${c.us ? 'text-[#D4622A]' : 'text-[#1E2D40]'}`}>{c.name}</td>
                  <td className="py-3 text-[#4A5568] text-center">{c.focus}</td>
                  <td className={`py-3 text-center ${c.us ? 'text-[#2EC4B6] font-medium' : 'text-[#718096]'}`}>{c.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#1E2D40] rounded-xl p-6">
        <div className="text-[#2EC4B6] text-xs uppercase tracking-wide font-mono mb-2">Verdict</div>
        <div className="text-white text-xl font-bold font-display mb-2">BUILD. Score: 8/10</div>
        <p className="text-white/70 text-sm">Strong problem-market fit. Underserved segment. Low competition in exact positioning. Multiple revenue streams. Recurring B2B revenue with annual contracts. Expandable post-traction.</p>
      </div>
    </div>
  )
}

function GTMSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1E2D40] font-display mb-2">GTM Plan</h1>
        <p className="text-[#718096]">Go-to-market strategy, channels, timeline, and success milestones.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Month 1 Target', value: '$1,500 MRR', sub: '3+ paying BIDs' },
          { label: 'Month 3 Target', value: '$4,000 MRR', sub: '10 customers at $400 avg' },
          { label: 'Month 6 Target', value: '$20,000 MRR', sub: '50 customers' },
          { label: 'Year 1 Target', value: '$80,000 MRR', sub: '200 customers' },
        ].map((m, i) => (
          <div key={i} className="bg-[#FAF8F5] border border-[#E3D9CE] rounded-xl p-5">
            <div className="text-xs text-[#718096] uppercase tracking-wide mb-1">{m.label}</div>
            <div className="text-2xl font-bold text-[#D4622A] font-mono">{m.value}</div>
            <div className="text-xs text-[#718096] mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-5 font-display">90-Day Timeline</h2>
        <div className="space-y-4">
          {[
            {
              phase: 'Month 1', title: 'Direct Outreach', color: '#D4622A',
              items: ['Identify 50 US BIDs with active digital programs', 'Cold email + LinkedIn outreach campaign', 'IDA forum posts — value-first intro', 'Set up 14-day free trial + welcome email sequence'],
            },
            {
              phase: 'Month 2', title: 'Content Moat', color: '#2EC4B6',
              items: ['2 SEO articles/week (low-competition keywords)', '5 city-specific landing pages live', 'BID Director\'s Guide PDF (lead magnet)', 'Google Ads test ($500) — validate keywords'],
            },
            {
              phase: 'Month 3', title: 'Scale + Social Proof', color: '#1E2D40',
              items: ['First case study: "[City] BID sees X check-ins in 30 days"', 'Free webinar: "Launch a Neighborhood Crawl That Proves ROI"', '20 city pages live — SEO flywheel starts', 'Partner referral pilot with BID consultants'],
            },
          ].map((p) => (
            <div key={p.phase} className="border-l-4 pl-4" style={{ borderColor: p.color }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-wide" style={{ color: p.color }}>{p.phase}</span>
                <span className="font-bold text-[#1E2D40] text-sm font-display">{p.title}</span>
              </div>
              <ul className="space-y-1">
                {p.items.map((item, j) => (
                  <li key={j} className="text-sm text-[#4A5568] flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Channel Strategy</h2>
        <div className="space-y-3">
          {[
            { channel: 'Direct Outreach', budget: '$0', cac: '$0', label: 'PRIMARY' },
            { channel: 'Content / SEO', budget: '$200/mo', cac: '$20', label: 'PRIMARY' },
            { channel: 'Product-Led Growth', budget: '$0', cac: '$0', label: 'SECONDARY' },
            { channel: 'LinkedIn', budget: '$0-300/mo', cac: '$30', label: 'SECONDARY' },
            { channel: 'Community (IDA, Main Street)', budget: '$0', cac: '$0', label: 'SUPPORTING' },
          ].map((c, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-lg">
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  c.label === 'PRIMARY' ? 'bg-[#D4622A]/10 text-[#D4622A]' :
                  c.label === 'SECONDARY' ? 'bg-[#2EC4B6]/10 text-[#2EC4B6]' :
                  'bg-[#F0EBE3] text-[#718096]'
                }`}>{c.label}</span>
                <span className="text-sm font-medium text-[#1E2D40]">{c.channel}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-[#718096]">Budget: <span className="font-mono text-[#1E2D40]">{c.budget}</span></span>
                <span className="text-[#718096]">CAC: <span className="font-mono text-[#D4622A]">{c.cac}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MarketingSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1E2D40] font-display mb-2">Marketing Plan</h1>
        <p className="text-[#718096]">Positioning, messaging pillars, personas, and content strategy.</p>
      </div>

      <div className="bg-[#1E2D40] rounded-xl p-6">
        <div className="text-[#D4622A] text-xs uppercase tracking-wide font-mono mb-3">Positioning Statement</div>
        <div className="space-y-2 text-white/80 text-sm leading-relaxed">
          <p><span className="text-white/50">For</span> <strong className="text-white">Business Improvement Districts and tourism boards</strong></p>
          <p><span className="text-white/50">Who</span> <strong className="text-white">need to prove their digital programs drive real foot traffic</strong></p>
          <p><span className="text-white/50">CrawlKit is</span> <strong className="text-white">a self-serve platform for building measurable neighborhood crawls</strong></p>
          <p><span className="text-white/50">Unlike</span> <strong className="text-white">Driftscape (enterprise) or paper maps (unmeasurable)</strong></p>
          <p><span className="text-white/50">We give you</span> <strong className="text-white">BID-grade analytics at prices local programs can afford</strong></p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Messaging Pillars</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: 'Proof', msg: '"Finally, data that proves your shop local program works"', color: '#D4622A' },
            { title: 'Simplicity', msg: '"Set up a crawl in 30 minutes. No app required."', color: '#2EC4B6' },
            { title: 'Affordability', msg: '"BID-grade analytics at prices local programs can afford"', color: '#1E2D40' },
          ].map((p, i) => (
            <div key={i} className="rounded-xl p-5" style={{ backgroundColor: p.color + '10', borderLeft: `3px solid ${p.color}` }}>
              <div className="font-bold mb-2 font-display" style={{ color: p.color }}>{p.title}</div>
              <p className="text-sm text-[#4A5568] italic">{p.msg}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
          <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Primary Persona: Dana the BID Director</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: 'Title', value: 'Executive Director / Marketing Manager, BID' },
              { label: 'Location', value: 'US, mid-sized city (50K-500K pop)' },
              { label: 'Budget', value: '$5K-50K/year for digital programs' },
              { label: 'Pain', value: "Can't show board that shop local program works" },
              { label: 'Decision time', value: '2-4 weeks for tools under $500/mo' },
            ].map((d) => (
              <div key={d.label} className="flex gap-2">
                <span className="text-[#718096] w-28 flex-shrink-0">{d.label}:</span>
                <span className="text-[#1E2D40]">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
          <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">7 Growth Motions Priority</h2>
          <div className="space-y-2">
            {[
              { motion: 'Outbound', status: 'PRIMARY', color: '#D4622A' },
              { motion: 'Content/SEO', status: 'PRIMARY', color: '#D4622A' },
              { motion: 'Product-Led Growth', status: 'SECONDARY', color: '#2EC4B6' },
              { motion: 'Community-Led', status: 'SUPPORTING', color: '#718096' },
              { motion: 'Viral/WOM', status: 'SECONDARY', color: '#2EC4B6' },
              { motion: 'Partner/Channel', status: 'MONTH 3+', color: '#718096' },
              { motion: 'Sales-Led (Enterprise)', status: 'ENTERPRISE', color: '#718096' },
            ].map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-[#4A5568]">{m.motion}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: m.color + '15', color: m.color }}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Content Calendar — Month 1</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E3D9CE]">
                {['Week', 'Blog', 'LinkedIn', 'Email'].map(h => (
                  <th key={h} className="text-left py-2 text-[#718096] font-medium pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EBE3]">
              {[
                { wk: 'Week 1', blog: 'Neighborhood Crawl ROI Guide', linkedin: '3 posts — data angle', email: 'Welcome sequence (5 emails)' },
                { wk: 'Week 2', blog: "BID Director's Foot Traffic Guide", linkedin: '3 posts — product demo', email: 'Lead magnet PDF' },
                { wk: 'Week 3', blog: 'Walking Tour App Comparison', linkedin: '3 posts — social proof', email: 'Non-converter follow-up' },
                { wk: 'Week 4', blog: 'CrawlKit vs Driftscape vs PlayTours', linkedin: '3 posts — founder story', email: 'Webinar invite' },
              ].map((r) => (
                <tr key={r.wk}>
                  <td className="py-3 font-mono text-xs text-[#D4622A] pr-4">{r.wk}</td>
                  <td className="py-3 text-[#4A5568] pr-4">{r.blog}</td>
                  <td className="py-3 text-[#4A5568] pr-4">{r.linkedin}</td>
                  <td className="py-3 text-[#4A5568]">{r.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function BrandSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1E2D40] font-display mb-2">Brand Spec</h1>
        <p className="text-[#718096]">Visual identity, color palette, typography, and usage guidelines.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-2 font-display">Brand Personality</h2>
        <p className="text-[#4A5568] text-sm mb-4">Community-first, data-confident, approachable — like a friendly city planner, not a Silicon Valley startup.</p>
        <div className="flex gap-3 flex-wrap">
          {['Community-first', 'Data-confident', 'Approachable', 'Warm', 'Trustworthy'].map(t => (
            <span key={t} className="bg-[#D4622A]/10 text-[#D4622A] text-xs px-3 py-1.5 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Deep Slate', hex: '#1E2D40', use: 'Text, nav, headings, dark BG' },
            { name: 'Terracotta', hex: '#D4622A', use: 'Brand, buttons, active states, route paths' },
            { name: 'Mint', hex: '#2EC4B6', use: 'Success, check-in, progress' },
            { name: 'Off-White', hex: '#FAF8F5', use: 'Page background — NOT pure white' },
          ].map((c) => (
            <div key={c.name} className="rounded-xl overflow-hidden border border-[#E3D9CE]">
              <div className="h-16" style={{ backgroundColor: c.hex }} />
              <div className="p-3">
                <div className="font-bold text-[#1E2D40] text-sm">{c.name}</div>
                <div className="font-mono text-xs text-[#718096]">{c.hex}</div>
                <div className="text-xs text-[#718096] mt-1">{c.use}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Typography</h2>
        <div className="space-y-4">
          {[
            { font: 'Space Grotesk', role: 'Display', use: 'Hero headlines, section titles, KPI numbers', weights: '500, 600, 700' },
            { font: 'Plus Jakarta Sans', role: 'Body', use: 'Body text, descriptions, nav, UI labels', weights: '400, 500, 600' },
            { font: 'DM Mono', role: 'Monospace', use: 'Analytics numbers, check-in counts, data stats', weights: '400, 500' },
          ].map((t) => (
            <div key={t.font} className="flex items-start gap-4 p-4 bg-[#FAF8F5] rounded-lg">
              <div className="w-24 flex-shrink-0">
                <span className="bg-[#D4622A]/10 text-[#D4622A] text-xs px-2 py-0.5 rounded font-medium">{t.role}</span>
              </div>
              <div>
                <div className="font-bold text-[#1E2D40] text-sm">{t.font}</div>
                <div className="text-xs text-[#718096] mt-0.5">{t.use}</div>
                <div className="text-xs text-[#718096] mt-0.5 font-mono">Weights: {t.weights}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Logo</h2>
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#D4622A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D4622A]/30">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="8" cy="8" r="3" fill="white" />
              <circle cx="24" cy="8" r="3" fill="white" />
              <circle cx="16" cy="24" r="3" fill="white" />
              <path d="M8 8 L24 8 L16 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1E2D40] font-display">CrawlKit</div>
            <div className="text-sm text-[#718096]">Space Grotesk Bold • Terracotta icon</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-[#718096]">
          <div className="bg-[#FAF8F5] p-3 rounded-lg">Primary variant: Off-white BG</div>
          <div className="bg-[#1E2D40] p-3 rounded-lg text-white/70">Reversed: Deep Slate BG</div>
          <div className="bg-[#D4622A] p-3 rounded-lg text-white/70">On-brand: Terracotta BG</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Brand Assets</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: 'Landing Page Mockup', file: 'crawlkit-landing-page.png' },
            { name: 'Analytics Dashboard', file: 'crawlkit-analytics-dashboard.png' },
            { name: 'Route Builder Admin', file: 'crawlkit-route-builder-admin.png' },
            { name: 'Route Detail (Mobile)', file: 'crawlkit-route-detail-mobile.png' },
            { name: 'Digital Passport', file: 'crawlkit-digital-passport-mobile.png' },
            { name: 'Check-in Confirmation', file: 'crawlkit-checkin-confirmation-mobile.png' },
            { name: 'Brand Sheet', file: 'crawlkit-brand-sheet.png' },
            { name: 'OG Image', file: 'crawlkit-og-image.png' },
          ].map((a) => (
            <a
              key={a.name}
              href={`https://drive.google.com/drive/folders/14jVTkb-AzQKlCUvLM6yBgg5ddNOhI1dW`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-[#FAF8F5] border border-[#E3D9CE] rounded-lg text-sm text-[#4A5568] hover:border-[#D4622A] hover:text-[#D4622A] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{a.name}</span>
            </a>
          ))}
        </div>
        <div className="mt-4">
          <a
            href="https://drive.google.com/drive/folders/14jVTkb-AzQKlCUvLM6yBgg5ddNOhI1dW"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#D4622A] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#C05522] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View All Assets in Drive
          </a>
        </div>
      </div>
    </div>
  )
}

function PitchSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#1E2D40] font-display mb-2">Pitch Deck</h1>
        <p className="text-[#718096]">12-slide interactive pitch deck with full navigation.</p>
      </div>

      <div className="bg-[#1E2D40] rounded-xl p-8 text-center">
        <div className="text-white text-2xl font-bold font-display mb-2">Interactive Pitch Deck</div>
        <p className="text-white/60 mb-6">Navigate with arrow keys or click through 12 full-screen slides.</p>
        <a
          href="/pitch"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#D4622A] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#C05522] transition-colors"
        >
          <Presentation className="w-5 h-5" />
          Open Pitch Deck
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="bg-white rounded-xl border border-[#E3D9CE] p-6">
        <h2 className="text-lg font-bold text-[#1E2D40] mb-4 font-display">Slide Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { n: '01', title: 'Title', sub: 'CrawlKit logo + tagline' },
            { n: '02', title: 'Problem', sub: '3 unsolved BID problems' },
            { n: '03', title: 'Solution', sub: 'Build → Track → Prove' },
            { n: '04', title: 'Market', sub: 'TAM $3.8B, SAM $600M' },
            { n: '05', title: 'Traction', sub: 'Live product, search signal' },
            { n: '06', title: 'Product', sub: '3 core features' },
            { n: '07', title: 'Business Model', sub: 'SaaS + unit economics' },
            { n: '08', title: 'Competition', sub: 'Matrix + our position' },
            { n: '09', title: 'GTM', sub: '2 channels, 90 days' },
            { n: '10', title: 'Team/Ask', sub: 'Asks + distribution' },
            { n: '11', title: 'Why Now', sub: '5 market tailwinds' },
            { n: '12', title: 'Vision', sub: 'Every downtown, everywhere' },
          ].map((s) => (
            <div key={s.n} className="bg-[#FAF8F5] rounded-lg p-3 border border-[#E3D9CE]">
              <span className="font-mono text-xs text-[#D4622A]">{s.n}</span>
              <div className="font-bold text-[#1E2D40] text-sm">{s.title}</div>
              <div className="text-xs text-[#718096]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const sectionComponents: Record<string, React.FC> = {
  research: ResearchSection,
  gtm: GTMSection,
  marketing: MarketingSection,
  brand: BrandSection,
  pitch: PitchSection,
}

export default function DocsHub() {
  const [active, setActive] = useState('research')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const ActiveSection = sectionComponents[active] || ResearchSection

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-body">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 h-screen w-64 bg-white border-r border-[#E3D9CE] flex flex-col z-30
        transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-[#E3D9CE]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4622A] rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                <circle cx="8" cy="8" r="3" fill="white" />
                <circle cx="24" cy="8" r="3" fill="white" />
                <circle cx="16" cy="24" r="3" fill="white" />
                <path d="M8 8 L24 8 L16 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[#1E2D40] text-sm font-display">CrawlKit</div>
              <div className="text-xs text-[#718096]">Documentation</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => { setActive(section.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 ${
                active === section.id
                  ? 'bg-[#D4622A]/10 text-[#D4622A] font-medium'
                  : 'text-[#4A5568] hover:bg-[#F0EBE3] hover:text-[#1E2D40]'
              }`}
            >
              <section.icon className="w-4 h-4 flex-shrink-0" />
              {section.label}
            </button>
          ))}

          <div className="mt-4 pt-4 border-t border-[#E3D9CE] space-y-1">
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#718096] hover:text-[#1E2D40] hover:bg-[#F0EBE3] transition-colors"
            >
              <Globe className="w-4 h-4" />
              Live Site
            </a>
            <a
              href="/pitch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#718096] hover:text-[#1E2D40] hover:bg-[#F0EBE3] transition-colors"
            >
              <Presentation className="w-4 h-4" />
              Pitch Deck
              <ExternalLink className="w-3 h-3 ml-auto" />
            </a>
          </div>
        </nav>

        {/* Built by */}
        <div className="p-3 border-t border-[#E3D9CE]">
          <div className="text-xs text-[#718096] text-center">Chime Stream B.V. © 2026</div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar (mobile) */}
        <div className="md:hidden sticky top-0 z-10 bg-white border-b border-[#E3D9CE] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-[#F0EBE3]">
            <Menu className="w-5 h-5 text-[#1E2D40]" />
          </button>
          <span className="font-bold text-[#1E2D40] font-display">CrawlKit Docs</span>
        </div>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-10 md:px-10">
          <ActiveSection />
        </main>
      </div>
    </div>
  )
}
