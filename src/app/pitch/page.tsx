'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, BarChart3, QrCode, ArrowRight, CheckCircle, XCircle, TrendingUp, Users, DollarSign, Zap, Globe, Clock, Target, Layers, Eye } from 'lucide-react'

const slides = [
  { id: 1, component: TitleSlide },
  { id: 2, component: ProblemSlide },
  { id: 3, component: SolutionSlide },
  { id: 4, component: MarketSlide },
  { id: 5, component: TractionSlide },
  { id: 6, component: ProductSlide },
  { id: 7, component: BusinessModelSlide },
  { id: 8, component: CompetitionSlide },
  { id: 9, component: GTMSlide },
  { id: 10, component: TeamSlide },
  { id: 11, component: WhyNowSlide },
  { id: 12, component: VisionSlide },
]

function TitleSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FAF8F5] p-8">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-[#D4622A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D4622A]/30">
            <MapPin className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-7xl font-bold text-[#1E2D40] font-display mb-4"
        >
          CrawlKit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl text-[#4A5568] font-body mb-8"
        >
          Build a neighborhood crawl. Prove it works.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#D4622A]/10 text-[#D4622A] px-6 py-3 rounded-full text-sm font-medium"
        >
          The ROI layer for shop local programs
        </motion.div>
      </div>
    </div>
  )
}

function ProblemSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#1E2D40] p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">The Problem</span>
          <h2 className="text-5xl font-bold text-white font-display">
            Local programs spend thousands.<br />Can&apos;t prove it&apos;s working.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Eye, title: 'No Visibility', desc: "Can't measure which marketing channels actually bring people through the door." },
            { icon: MapPin, title: 'No Discovery', desc: "No easy way to create themed routes visitors actually follow." },
            { icon: BarChart3, title: 'No ROI Proof', desc: "When the board asks 'is this working?' — there's no answer." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10"
            >
              <item.icon className="w-8 h-8 text-[#D4622A] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 font-display">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-[#D4622A]/20 border border-[#D4622A]/30 rounded-xl p-4 flex items-center gap-4"
        >
          <span className="text-[#D4622A] font-mono text-3xl font-bold">1,000+</span>
          <span className="text-white/80">US Business Improvement Districts — zero have a native foot traffic analytics platform.</span>
        </motion.div>
      </div>
    </div>
  )
}

function SolutionSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FAF8F5] p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">The Solution</span>
          <h2 className="text-5xl font-bold text-[#1E2D40] font-display">
            From paper maps to<br />measurable campaigns
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Layers, step: '01', color: '#D4622A', title: 'BUILD', desc: 'Drag-and-drop route builder. 30 minutes to go live. No app required.' },
            { icon: QrCode, step: '02', color: '#2EC4B6', title: 'TRACK', desc: 'QR check-ins + GPS verify every stop. Real-time dashboard.' },
            { icon: BarChart3, step: '03', color: '#1E2D40', title: 'PROVE', desc: 'Route completions, dwell time, conversion data. Export for your board.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 + 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-md border border-[#E3D9CE] relative overflow-hidden"
            >
              <div className="text-6xl font-mono font-bold text-[#F0EBE3] absolute top-4 right-4">{item.step}</div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: item.color + '20' }}>
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#1E2D40] mb-2 font-display">{item.title}</h3>
              <p className="text-[#4A5568] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex items-center justify-center gap-3 text-[#4A5568]"
        >
          <div className="w-3 h-3 rounded-full bg-[#2EC4B6]" />
          <span className="text-sm">Key differentiator: No app to download — consumers just scan QR → mobile web</span>
        </motion.div>
      </div>
    </div>
  )
}

function MarketSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#D4622A]/5 p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Market Opportunity</span>
          <h2 className="text-5xl font-bold text-[#1E2D40] font-display">A $3.8B problem<br />nobody is solving well</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: 'TAM', value: '$3.8B', sub: '1,000 US BIDs × $3,800/yr avg', bg: '#1E2D40', text: 'white' },
            { label: 'SAM', value: '$600M', sub: 'Tech-ready BIDs with digital budgets', bg: '#D4622A', text: 'white' },
            { label: 'SOM (Y1)', value: '$1.2M', sub: '200 customers × $6K ACV', bg: 'white', text: '#1E2D40' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="rounded-2xl p-8"
              style={{ backgroundColor: item.bg, border: item.bg === 'white' ? '1px solid #E3D9CE' : 'none' }}
            >
              <div className="text-xs uppercase tracking-widest mb-2 font-mono" style={{ color: item.text === 'white' ? 'rgba(255,255,255,0.6)' : '#718096' }}>{item.label}</div>
              <div className="text-5xl font-bold font-mono mb-2" style={{ color: item.text === 'white' ? 'white' : item.text }}>{item.value}</div>
              <div className="text-sm" style={{ color: item.text === 'white' ? 'rgba(255,255,255,0.7)' : '#718096' }}>{item.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'QR adoption', stat: 'Mainstream', icon: QrCode },
            { label: 'Tourism rebound', stat: '+18% YoY', icon: TrendingUp },
            { label: 'Independent retail loss', stat: '30% since 2020', icon: Target },
            { label: 'Shop local grants', stat: 'All-time high', icon: DollarSign },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.7 }}
              className="bg-white rounded-xl p-4 border border-[#E3D9CE] flex items-center gap-3"
            >
              <item.icon className="w-5 h-5 text-[#D4622A] flex-shrink-0" />
              <div>
                <div className="text-xs text-[#718096]">{item.label}</div>
                <div className="text-sm font-bold text-[#1E2D40] font-mono">{item.stat}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TractionSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#1E2D40] p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <span className="text-[#2EC4B6] text-sm uppercase tracking-widest font-mono mb-4 block">Traction</span>
          <h2 className="text-5xl font-bold text-white font-display">Live product. Real signal.</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: '48h', label: 'Time to build' },
            { value: '6', label: 'Core features live' },
            { value: '0', label: 'Direct US competitors' },
            { value: '1.2K', label: 'Monthly searches' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="bg-white/10 rounded-2xl p-6 text-center border border-white/10"
            >
              <div className="text-4xl font-bold text-[#D4622A] font-mono mb-1">{item.value}</div>
              <div className="text-white/60 text-xs uppercase tracking-wide">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { kw: '"walking tour app for businesses"', vol: '1,200/mo', comp: 'LOW' },
            { kw: '"BID marketing tools"', vol: '400/mo', comp: 'LOW' },
            { kw: '"business improvement district software"', vol: '1,100/mo', comp: 'LOW' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.6 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="text-white/80 text-xs font-mono mb-2">{item.kw}</div>
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-sm">{item.vol}</span>
                <span className="bg-[#2EC4B6]/20 text-[#2EC4B6] text-xs px-2 py-0.5 rounded-full">{item.comp} competition</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FAF8F5] p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Product</span>
          <h2 className="text-5xl font-bold text-[#1E2D40] font-display">Three things that make CrawlKit work</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: QrCode,
              title: 'No-App Check-In',
              subtitle: 'QR scan → mobile web → GPS verify → stamp',
              bullets: ['No app download required', 'Anti-fraud: 1 check-in per 24h', 'Offline fallback mode', '10x more completions'],
              color: '#D4622A',
            },
            {
              icon: Layers,
              title: 'Self-Serve Builder',
              subtitle: '30 minutes from zero to live crawl',
              bullets: ['Drag-and-drop stops', 'QR codes in 1 click', 'Seasonal scheduling', 'Business directory'],
              color: '#2EC4B6',
            },
            {
              icon: BarChart3,
              title: 'ROI Dashboard',
              subtitle: 'Data your board can read',
              bullets: ['Check-ins per stop', 'Route completion rates', 'Peak hours heatmap', 'PDF export for board'],
              color: '#1E2D40',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-[#E3D9CE]"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: item.color + '15' }}>
                <item.icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#1E2D40] mb-1 font-display">{item.title}</h3>
              <p className="text-sm text-[#718096] mb-4">{item.subtitle}</p>
              <ul className="space-y-2">
                {item.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-[#4A5568]">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function BusinessModelSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#D4622A]/5 p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Business Model</span>
          <h2 className="text-5xl font-bold text-[#1E2D40] font-display">B2B SaaS with annual contracts</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { name: 'Starter', price: '$299', period: '/mo', features: ['5 active routes', '50 business listings', 'Basic analytics', 'QR codes'], featured: false },
            { name: 'Growth', price: '$499', period: '/mo', features: ['Unlimited routes', '200 businesses', 'Full analytics', 'White-label'], featured: true },
            { name: 'Enterprise', price: '$999+', period: '/mo', features: ['API access', 'Custom integrations', 'Dedicated support', 'Multi-city'], featured: false },
          ].map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`rounded-2xl p-6 relative ${tier.featured ? 'bg-[#D4622A] text-white shadow-xl shadow-[#D4622A]/30' : 'bg-white border border-[#E3D9CE]'}`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E2D40] text-white text-xs px-3 py-1 rounded-full font-medium">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`font-bold mb-1 font-display ${tier.featured ? 'text-white/90' : 'text-[#1E2D40]'}`}>{tier.name}</h3>
              <div className={`text-4xl font-bold font-mono mb-4 ${tier.featured ? 'text-white' : 'text-[#1E2D40]'}`}>
                {tier.price}<span className={`text-base font-normal ${tier.featured ? 'text-white/70' : 'text-[#718096]'}`}>{tier.period}</span>
              </div>
              <ul className="space-y-2">
                {tier.features.map((f, j) => (
                  <li key={j} className={`flex items-center gap-2 text-sm ${tier.featured ? 'text-white/80' : 'text-[#4A5568]'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${tier.featured ? 'bg-white/60' : 'bg-[#D4622A]'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Avg ARPC', value: '$400/mo' },
            { label: 'ACV', value: '$4,800' },
            { label: 'LTV (2yr)', value: '$9,600' },
            { label: 'LTV:CAC', value: '192:1' },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 + 0.7 }} className="bg-white rounded-xl p-4 border border-[#E3D9CE] text-center">
              <div className="text-2xl font-bold font-mono text-[#D4622A]">{m.value}</div>
              <div className="text-xs text-[#718096] mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompetitionSlide() {
  const rows = [
    { feature: 'Self-serve setup', us: true, driftscape: false, playtours: false, paper: true },
    { feature: 'B2B analytics', us: true, driftscape: true, playtours: false, paper: false },
    { feature: 'No-app check-in', us: true, driftscape: false, playtours: true, paper: false },
    { feature: 'US SMB pricing', us: true, driftscape: false, playtours: false, paper: true },
    { feature: 'White-label', us: true, driftscape: true, playtours: false, paper: false },
    { feature: 'Quick setup', us: true, driftscape: false, playtours: true, paper: true },
  ]

  return (
    <div className="h-screen flex items-center justify-center bg-[#1E2D40] p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Competition</span>
          <h2 className="text-5xl font-bold text-white font-display">We own a slot nobody<br />else is filling</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 text-sm font-normal">Feature</th>
                <th className="p-4 text-center">
                  <span className="bg-[#D4622A] text-white text-xs px-3 py-1.5 rounded-full font-bold">CrawlKit ✨</span>
                </th>
                <th className="p-4 text-center text-white/60 text-sm">Driftscape</th>
                <th className="p-4 text-center text-white/60 text-sm">PlayTours</th>
                <th className="p-4 text-center text-white/60 text-sm">Paper Maps</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.5 }}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="p-4 text-white/80 text-sm">{row.feature}</td>
                  {(['us', 'driftscape', 'playtours', 'paper'] as const).map((key) => (
                    <td key={key} className="p-4 text-center">
                      {row[key] ? (
                        <CheckCircle className={`w-5 h-5 mx-auto ${key === 'us' ? 'text-[#2EC4B6]' : 'text-white/30'}`} />
                      ) : (
                        <XCircle className="w-5 h-5 mx-auto text-[#D4622A]/40" />
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}

function GTMSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FAF8F5] p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Go-to-Market</span>
          <h2 className="text-5xl font-bold text-[#1E2D40] font-display">Two channels.<br />90 days to $4K MRR.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              phase: 'Month 1',
              title: 'Direct Outreach',
              icon: Users,
              color: '#D4622A',
              target: '3 paying BID customers',
              actions: ['50 US BIDs identified', 'Cold email + LinkedIn', 'IDA community posts', '14-day free trial'],
            },
            {
              phase: 'Month 2',
              title: 'Content Moat',
              icon: TrendingUp,
              color: '#2EC4B6',
              target: '5 more customers, 20 trials',
              actions: ['2 SEO articles/week', '5 city landing pages', 'BID Director PDF guide', 'Google Ads test ($500)'],
            },
            {
              phase: 'Month 3',
              title: 'Scale + Proof',
              icon: BarChart3,
              color: '#1E2D40',
              target: '10 customers = $4K MRR',
              actions: ['First case study published', 'Free webinar', '20 city pages live', 'Partner referral program'],
            },
          ].map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.3 }}
              className="bg-white rounded-2xl p-6 border border-[#E3D9CE]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: phase.color + '15' }}>
                  <phase.icon className="w-5 h-5" style={{ color: phase.color }} />
                </div>
                <div>
                  <div className="text-xs text-[#718096]">{phase.phase}</div>
                  <div className="font-bold text-[#1E2D40] font-display">{phase.title}</div>
                </div>
              </div>
              <div className="bg-[#F0EBE3] rounded-lg p-3 mb-4">
                <span className="text-xs text-[#4A5568]">Target: </span>
                <span className="text-xs font-bold text-[#1E2D40]">{phase.target}</span>
              </div>
              <ul className="space-y-1.5">
                {phase.actions.map((a, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-[#4A5568]">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: phase.color }} />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TeamSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#D4622A]/5 p-8 md:p-16">
      <div className="max-w-5xl w-full text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Built By</span>
          <h2 className="text-5xl font-bold text-[#1E2D40] font-display mb-4">Built fast. Priced right.<br />Distribution-ready.</h2>
          <p className="text-[#718096] text-lg max-w-2xl mx-auto">Jarvis AI Product Factory — zero to live product in 48 hours.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Zap, label: '48 hours', sub: 'Zero to live product' },
            { icon: DollarSign, label: '$0 upfront', sub: 'Free trial, pay when ready' },
            { icon: Globe, label: 'US-first', sub: '1,000 BIDs waiting' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="bg-white rounded-2xl p-8 border border-[#E3D9CE]"
            >
              <item.icon className="w-10 h-10 text-[#D4622A] mx-auto mb-3" />
              <div className="text-2xl font-bold text-[#1E2D40] font-mono mb-1">{item.label}</div>
              <div className="text-sm text-[#718096]">{item.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#1E2D40] rounded-2xl p-6 text-left">
          <div className="text-white/60 text-sm uppercase tracking-wide font-mono mb-3">What we need</div>
          <div className="grid grid-cols-3 gap-4">
            {['5 BID director intros', 'IDA newsletter placement', '$500 Month 1 budget'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-[#D4622A]" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function WhyNowSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#1E2D40] p-8 md:p-16">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <span className="text-[#2EC4B6] text-sm uppercase tracking-widest font-mono mb-4 block">Why Now</span>
          <h2 className="text-5xl font-bold text-white font-display">5 tailwinds converging<br />right now</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { num: '01', title: 'Shop local money is flowing', desc: 'Federal grants for downtown digital programs at all-time highs' },
            { num: '02', title: 'QR codes are normal', desc: 'Every restaurant table has one. Consumers are trained.' },
            { num: '03', title: 'Tourism rebound', desc: 'Experiential travel (food tours, crawls) up 23% YoY' },
            { num: '04', title: 'BIDs under pressure', desc: 'Post-COVID: 30% retail loss. Boards demand ROI proof.' },
            { num: '05', title: 'SMB slot is empty', desc: 'Driftscape exists for enterprise. Nobody owns $299/mo.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="bg-white/10 rounded-2xl p-5 border border-white/10"
            >
              <div className="text-[#D4622A] font-mono text-xs mb-3">{item.num}</div>
              <h3 className="font-bold text-white text-sm mb-2 font-display">{item.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function VisionSlide() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FAF8F5] p-8 md:p-16">
      <div className="max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="text-[#D4622A] text-sm uppercase tracking-widest font-mono mb-4 block">Vision</span>
          <h2 className="text-6xl font-bold text-[#1E2D40] font-display mb-4">Every downtown.<br />Everywhere.</h2>
          <p className="text-[#718096] text-xl max-w-2xl mx-auto">CrawlKit becomes the operating system for local business discovery.</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { year: 'Year 1', milestone: '$80K MRR', sub: '200 US BIDs on platform', color: '#D4622A' },
            { year: 'Year 2', milestone: 'International', sub: 'UK, Canada, Australia', color: '#2EC4B6' },
            { year: 'Year 3', milestone: 'Category Leader', sub: 'IDA standard. Consumer app.', color: '#1E2D40' },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 + 0.4 }}
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: m.color, boxShadow: `0 8px 32px ${m.color}30` }}
            >
              <div className="text-white/70 text-xs font-mono uppercase tracking-wide mb-2">{m.year}</div>
              <div className="text-2xl font-bold text-white font-display mb-1">{m.milestone}</div>
              <div className="text-white/70 text-sm">{m.sub}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center bg-[#1E2D40] rounded-2xl p-8"
        >
          <p className="text-white text-2xl font-display font-semibold mb-2">
            &ldquo;The city crawl that pays for itself.&rdquo;
          </p>
          <p className="text-white/50 text-sm">crawlkit.ashketing.com</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function PitchDeck() {
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => setCurrent(c => Math.min(c + 1, slides.length - 1)), [])
  const goPrev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  const SlideComponent = slides[current].component

  return (
    <div className="h-screen w-screen overflow-hidden relative font-body">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full w-full"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="fixed left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-current opacity-60" />
      </button>
      <button
        onClick={goNext}
        className="fixed right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-current opacity-60" />
      </button>

      {/* Progress dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-[#D4622A]' : 'w-2 h-2 bg-[#1E2D40]/20 hover:bg-[#1E2D40]/40'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed top-4 right-4 text-xs font-mono text-current opacity-40">
        {current + 1} / {slides.length}
      </div>
    </div>
  )
}
