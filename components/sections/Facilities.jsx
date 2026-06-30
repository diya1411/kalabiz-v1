"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";
import LocationsMap from "@/components/LocationsMap";

// The six manufacturing plants — shown as a collage on the Production panel
const PLANTS = [
  { img: "/images/plant-corporate.jpg", name: "Corporate HQ & R&D", note: "Pimpri, Pune" },
  { img: "/images/plant-genset1.jpg", name: "Genset Plant — Unit 1", note: "Chakan, Pune" },
  { img: "/images/plant-genset4.jpg", name: "Control Panels — Unit 4", note: "Chakan, Pune" },
  { img: "/images/plant-defence.jpg", name: "Defence Plant", note: "Talegaon, Maval" },
  { img: "/images/plant-bengaluru.jpg", name: "Manufacturing Plant", note: "Bengaluru" },
  { img: "/images/plant-biotech.jpg", name: "Biotech & Cold Chain", note: "Pune" },
];

// 12 functions — 7 core + 5 enabling — that run across every KALA company
const BACKBONE = [
  { id: "marketing", category: "Core Function", name: "Marketing", img: "/images/backbone/marketing.png", desc: "Brand building, demand generation and market reach across every KALA vertical.", tags: ["Brand & Demand", "Campaigns", "Market Reach"] },
  { id: "sales", category: "Core Function", name: "Sales", img: "/images/backbone/sales.png", desc: "A pan-India and global sales network converting pipeline into installations.", tags: ["Pan-India Network", "Global Sales", "Key Accounts"] },
  { id: "rnd", category: "Core Function", name: "R&D", img: "/images/backbone/rnd.png", desc: "100+ engineers driving design, indigenisation and continuous innovation.", tags: ["100+ Engineers", "Design", "Indigenisation"] },
  { id: "production", category: "Core Function", name: "Production", img: "/images/gallery/assembly-line.jpg", desc: "Six plants manufacturing gensets and systems from 5 kVA to 5 MW.", tags: ["6 Plants", "5 kVA – 5 MW", "CPCB IV+"] },
  { id: "support", category: "Core Function", name: "Product Support", img: "/images/backbone/support.png", desc: "AMC, spares and reconditioning delivering full-lifecycle care.", tags: ["AMC", "Spares", "Reconditioning"] },
  { id: "projects", category: "Core Function", name: "Project Division", img: "/images/gallery/deployment.jpg", desc: "Turnkey project delivery from design through erection and commissioning.", tags: ["Turnkey", "Design-to-Erection", "Commissioning"] },
  { id: "quality", category: "Core Function", name: "Quality Systems", img: "/images/backbone/quality.png", desc: "ISO, DGQA and CPCB IV+ assurance embedded across every line.", tags: ["ISO 9001", "DGQA", "CPCB IV+"] },
  { id: "finance", category: "Enabling Function", name: "Finance", img: "/images/backbone/finance.png", desc: "Capital allocation, financial controls and funding for growth.", tags: ["Capital", "Controls", "Growth"] },
  { id: "hr", category: "Enabling Function", name: "HR", img: "/images/backbone/hr.png", desc: "Talent acquisition, culture and GenNext leadership readiness.", tags: ["Talent", "Culture", "GenNext"] },
  { id: "legal", category: "Enabling Function", name: "Legal & Statutory", img: "/images/backbone/legal.png", desc: "Compliance, intellectual-property protection and corporate governance.", tags: ["Compliance", "IP", "Governance"] },
  { id: "it", category: "Enabling Function", name: "IT Infrastructure", img: "/images/backbone/it.png", desc: "ERP systems, networks and the cybersecurity backbone.", tags: ["ERP", "Networks", "Security"] },
  { id: "saas", category: "Enabling Function", name: "AI/ML", img: "/images/backbone/aiml.png", desc: "Digital platforms and SaaS connecting every function end-to-end.", tags: ["SaaS", "Digital Platforms", "Integration"] },
];

// Product Support (05) — full-lifecycle care, shown as a circular flow
const LIFECYCLE = [
  { label: "Design", angle: -90 },
  { label: "Manufacture", angle: -30 },
  { label: "Deploy", angle: 30 },
  { label: "Maintain", angle: 90 },
  { label: "Upgrade", angle: 150 },
  { label: "Repeat", angle: 210 },
];

// node centre on a circle of radius r (% of container), 0° = right, clockwise
function nodePos(angle, r = 38) {
  const rad = (angle * Math.PI) / 180;
  return { left: `${50 + r * Math.cos(rad)}%`, top: `${50 + r * Math.sin(rad)}%` };
}

// IT Infrastructure (11) — every system interconnected like one operating system
const IT_NODES = ["ERP", "CRM", "Cloud", "Plants", "Warehouses", "Employees", "Security"];

// numeric point on a circle, for both SVG mesh lines and chip placement
function ringPoint(i, n, r = 38) {
  const rad = ((-90 + (i * 360) / n) * Math.PI) / 180;
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) };
}

// Finance (08) — abstract dashboard cards, kept minimal
const FINANCE = [
  { label: "Cash Flow", trend: "up" },
  { label: "Forecast", trend: "up" },
  { label: "Budget", trend: "flat" },
  { label: "Growth", trend: "up" },
  { label: "Performance", trend: "up" },
];

// HR (09) — the people journey, hire to leadership
const HR_STAGES = [
  { label: "Recruit", note: "Attract top talent" },
  { label: "Onboard", note: "Integrate & equip" },
  { label: "Learn", note: "Continuous upskilling" },
  { label: "Perform", note: "Deliver & grow" },
  { label: "Lead", note: "Shape GenNext" },
];

// Quality (07) — precision metrology instruments
const QUALITY_TOOLS = ["Vernier Calipers", "Micrometer", "CMM Probe", "Surface Finish", "Inspection Camera"];

// Legal (10) — governance pillars
const LEGAL_ITEMS = ["Compliance", "Intellectual Property", "Corporate Governance", "Contracts", "Statutory Filings"];

// AI/ML (12) — abstract neural mesh: hand-placed nodes + edges
const AI_NODES = [
  { x: 18, y: 24 }, { x: 40, y: 14 }, { x: 64, y: 22 }, { x: 84, y: 34 },
  { x: 26, y: 52 }, { x: 50, y: 46 }, { x: 74, y: 58 },
  { x: 16, y: 78 }, { x: 42, y: 84 }, { x: 68, y: 80 }, { x: 88, y: 70 },
];
const AI_EDGES = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [3, 6],
  [4, 5], [5, 6], [4, 7], [5, 8], [6, 9], [6, 10], [7, 8], [8, 9], [9, 10],
];

export default function Facilities() {
  const [active, setActive] = useState(0);
  const f = BACKBONE[active];

  return (
    <section id="facilities" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 80% 20%, rgba(22,197,233,0.16), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel index="10" className="!text-cyan-soft">Operational Backbone</SectionLabel>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            <TextReveal text="The backbone behind" />{" "}
            <TextReveal text="every vertical." className="text-cyan-soft" />
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/55">
            Twelve functions — seven core, five enabling — run as one integrated
            operating system across every KALA company.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* selectable list */}
          <div className="flex flex-col gap-2.5">
            {BACKBONE.map((item, i) => (
              <button
                key={item.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative w-full overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 ${
                  active === i
                    ? "border-cyan/40 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="relative h-12 w-12 flex-none overflow-hidden rounded-xl border border-white/10">
                    <Image src={item.img} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span className={`font-mono text-xs transition-colors ${active === i ? "text-cyan-soft" : "text-white/40"}`}>
                    {`0${i + 1}`.slice(-2)}
                  </span>
                  <p className="min-w-0 flex-1 font-display text-base font-bold leading-tight">{item.name}</p>
                  <motion.span
                    animate={{ x: active === i ? 0 : -6, opacity: active === i ? 1 : 0 }}
                    className="text-cyan-soft"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                </div>
                {active === i && (
                  <motion.span
                    layoutId="backbone-active"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue to-cyan"
                  />
                )}
              </button>
            ))}
          </div>

          {/* detail panel */}
          <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/15 bg-ink sm:h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {/* related image */}
                <Image
                  src={f.img}
                  alt={f.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25" />

                {/* content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold text-cyan-soft backdrop-blur">
                      {f.category === "Core Function" ? "Core Function" : "Enabling Foundation"}
                    </span>
                    <span className="font-display text-7xl font-extrabold leading-none text-white/15 md:text-8xl">
                      {`0${active + 1}`.slice(-2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{f.name}</h3>
                    <p className="mt-3 max-w-md text-white/75">{f.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {f.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Production (04) reveals a collage of the six plants */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                f.id === "production" ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className="grid h-full grid-cols-2 grid-rows-3 gap-1.5 p-1.5">
                {PLANTS.map((p) => (
                  <figure key={p.img} className="relative overflow-hidden rounded-xl">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-2">
                      <p className="text-[11px] font-bold leading-tight text-white">{p.name}</p>
                      <p className="text-[9px] leading-tight text-white/70">{p.note}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Product Support (05) — circular full-lifecycle */}
            <OverlayShell active={f.id === "support"} badge="Core Function" title="Full-Lifecycle Care">
              <LifecycleRing />
            </OverlayShell>

            {/* Quality Systems (07) — precision metrology HUD */}
            <OverlayShell active={f.id === "quality"} badge="Core Function" title="Measured to the Micron">
              <QualityHUD />
            </OverlayShell>

            {/* Finance (08) — abstract financial dashboard */}
            <OverlayShell active={f.id === "finance"} badge="Enabling Foundation" title="Capital, in Real Time">
              <FinanceCards />
            </OverlayShell>

            {/* HR (09) — the people journey */}
            <OverlayShell active={f.id === "hr"} badge="Enabling Foundation" title="From Hire to Leadership">
              <HRJourney />
            </OverlayShell>

            {/* Legal (10) — architectural / governance treatment */}
            <OverlayShell active={f.id === "legal"} badge="Enabling Foundation" title="Built on Governance">
              <LegalArch />
            </OverlayShell>

            {/* IT Infrastructure (11) — interconnected operating system */}
            <OverlayShell active={f.id === "it"} badge="Enabling Foundation" title="One Integrated Operating System">
              <ITMap />
            </OverlayShell>

            {/* AI/ML (12) — flowing neural intelligence */}
            <OverlayShell active={f.id === "saas"} badge="Enabling Foundation" title="A Living Neural Fabric">
              <AIMesh />
            </OverlayShell>

            {/* Project Division (06) reveals the deployment map */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                f.id === "projects" ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <LocationsMap fill />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Backbone overlays ─────────────────────────────────────────────── */

// Dark themed wrapper for every graphic overlay — bg, glow and header
function OverlayShell({ active, badge, title, children }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ${
        active ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(22,197,233,0.14), transparent 70%)" }}
        />
      </div>
      <div className="relative flex h-full flex-col p-7 md:p-9">
        <div>
          <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold text-cyan-soft backdrop-blur">
            {badge}
          </span>
          <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

// 05 — Product Support: a continuous circular lifecycle
function LifecycleRing() {
  return (
    <div className="relative mx-auto my-auto aspect-square h-full max-h-[360px] w-auto max-w-full">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[16%] rounded-full border-2 border-dashed border-cyan/30"
      />
      <div className="absolute inset-[16%] rounded-full bg-cyan/[0.04]" />

      <div className="absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue to-cyan shadow-soft">
        <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none">
          <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {LIFECYCLE.map((s, i) => {
        const p = nodePos(s.angle);
        return (
          <div
            key={s.label}
            style={{ left: p.left, top: p.top }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan/40 bg-white/10 font-mono text-xs font-semibold text-cyan-soft backdrop-blur">
              {i + 1}
            </span>
            <span className="whitespace-nowrap rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur">
              {s.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// 07 — Quality Systems: a metrology inspection reticle + instruments
function QualityHUD() {
  return (
    <div className="relative my-auto flex w-full flex-col items-center gap-6">
      <div className="relative aspect-square w-44 md:w-52">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-cyan/30"
        />
        <div className="absolute inset-[14%] rounded-full border border-cyan/40" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan/20" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan/20" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-mono text-2xl font-bold text-cyan-soft">±1µm</p>
          <p className="text-[10px] uppercase tracking-widest text-white/50">tolerance</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {QUALITY_TOOLS.map((t) => (
          <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// 08 — Finance: minimal floating dashboard cards
function Sparkline({ flat, big }) {
  const pts = flat ? "0,11 15,10 30,11 45,9 60,10" : "0,18 15,12 30,14 45,6 60,2";
  return (
    <svg viewBox="0 0 60 20" preserveAspectRatio="none" className={`mt-3 w-full ${big ? "h-12" : "h-8"}`}>
      <polyline points={pts} fill="none" stroke="#16c5e9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FinanceCards() {
  return (
    <div className="my-auto grid grid-cols-2 gap-3 md:gap-4">
      {FINANCE.map((c, i) => (
        <motion.div
          key={c.label}
          animate={{ y: [0, i % 2 ? 6 : -6, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur ${i === 0 ? "col-span-2" : ""}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/55">{c.label}</span>
            <span className={`text-xs ${c.trend === "flat" ? "text-white/40" : "text-cyan-soft"}`}>
              {c.trend === "flat" ? "▬" : "▲"}
            </span>
          </div>
          <Sparkline flat={c.trend === "flat"} big={i === 0} />
        </motion.div>
      ))}
    </div>
  );
}

// 09 — HR: a vertical hire-to-leadership journey
function HRJourney() {
  return (
    <div className="my-auto w-full max-w-sm">
      <ol>
        {HR_STAGES.map((s, i) => (
          <li key={s.label} className="relative flex items-stretch gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-cyan/40 bg-white/10 font-mono text-xs font-semibold text-cyan-soft backdrop-blur">
                {i + 1}
              </span>
              {i < HR_STAGES.length - 1 && <span className="mt-1 w-px flex-1 bg-gradient-to-b from-cyan/50 to-cyan/10" />}
            </div>
            <div className="pt-1.5">
              <p className="font-display text-lg font-bold leading-tight">{s.label}</p>
              <p className="text-xs text-white/50">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// 10 — Legal: a glass-facade boardroom with governance pillars
function LegalArch() {
  return (
    <div className="relative my-auto flex w-full flex-col items-center gap-6">
      <div className="relative h-40 w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] md:h-48">
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="border border-cyan/10" />
          ))}
        </div>
        <motion.div
          animate={{ x: ["-120%", "240%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-cyan/40" />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {LEGAL_ITEMS.map((t) => (
          <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// 11 — IT Infrastructure: every system meshed into one OS
function ITMap() {
  const n = IT_NODES.length;
  const pts = IT_NODES.map((_, i) => ringPoint(i, n));
  return (
    <div className="relative mx-auto my-auto aspect-square h-full max-h-[360px] w-auto max-w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="it-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.g
          filter="url(#it-glow)"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          stroke="#16c5e9"
          strokeWidth="0.4"
          strokeLinecap="round"
        >
          {pts.map((p, i) => (
            <line key={`s${i}`} x1="50" y1="50" x2={p.x} y2={p.y} />
          ))}
          {pts.map((p, i) => {
            const q = pts[(i + 1) % n];
            return <line key={`r${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} opacity="0.5" />;
          })}
        </motion.g>
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue to-cyan shadow-soft">
        <svg width="34%" height="34%" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="white" strokeWidth="2" />
        </svg>
        <span className="mt-1 font-display text-[10px] font-bold leading-none">KALA OS</span>
      </div>

      {pts.map((p, i) => (
        <div
          key={IT_NODES[i]}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
        >
          <span className="h-3 w-3 rounded-full bg-cyan-soft shadow-[0_0_10px_rgba(22,197,233,0.9)]" />
          <span className="whitespace-nowrap rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/90 backdrop-blur">
            {IT_NODES[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

// 12 — AI/ML: a pulsing neural mesh, abstract flowing intelligence
function AIMesh() {
  return (
    <div className="relative mx-auto my-auto aspect-square h-full max-h-[360px] w-auto max-w-full">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="ai-glow">
            <feGaussianBlur stdDeviation="0.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="#16c5e9" strokeWidth="0.3" opacity="0.45">
          {AI_EDGES.map(([a, b], i) => (
            <line key={i} x1={AI_NODES[a].x} y1={AI_NODES[a].y} x2={AI_NODES[b].x} y2={AI_NODES[b].y} />
          ))}
        </g>
        <g filter="url(#ai-glow)" fill="#16c5e9">
          {AI_NODES.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              animate={{ opacity: [0.3, 1, 0.3], r: [1.1, 1.9, 1.1] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: (i % 5) * 0.4, ease: "easeInOut" }}
            />
          ))}
        </g>
      </svg>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80 backdrop-blur">
        Neural fabric · self-learning
      </span>
    </div>
  );
}
