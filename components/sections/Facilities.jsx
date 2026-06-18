"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

// 12 functions — 7 core + 5 enabling — that run across every KALA company
const BACKBONE = [
  { id: "marketing", group: "Core Functions", category: "Core Function", name: "Marketing", desc: "Brand building, demand generation and market reach across every KALA vertical.", tags: ["Brand & Demand", "Campaigns", "Market Reach"] },
  { id: "sales", group: "Core Functions", category: "Core Function", name: "Sales", desc: "A pan-India and global sales network converting pipeline into installations.", tags: ["Pan-India Network", "Global Sales", "Key Accounts"] },
  { id: "rnd", group: "Core Functions", category: "Core Function", name: "R&D", desc: "100+ engineers driving design, indigenisation and continuous innovation.", tags: ["100+ Engineers", "Design", "Indigenisation"] },
  { id: "production", group: "Core Functions", category: "Core Function", name: "Production", desc: "Six plants manufacturing gensets and systems from 5 kVA to 5 MW.", tags: ["6 Plants", "5 kVA – 5 MW", "CPCB IV+"] },
  { id: "support", group: "Core Functions", category: "Core Function", name: "Product Support", desc: "AMC, spares and reconditioning delivering full-lifecycle care.", tags: ["AMC", "Spares", "Reconditioning"] },
  { id: "projects", group: "Core Functions", category: "Core Function", name: "Project Division", desc: "Turnkey project delivery from design through erection and commissioning.", tags: ["Turnkey", "Design-to-Erection", "Commissioning"] },
  { id: "quality", group: "Core Functions", category: "Core Function", name: "Quality Systems", desc: "ISO, DGQA and CPCB IV+ assurance embedded across every line.", tags: ["ISO 9001", "DGQA", "CPCB IV+"] },
  { id: "finance", group: "Enabling Foundation", category: "Enabling Function", name: "Finance", desc: "Capital allocation, financial controls and funding for growth.", tags: ["Capital", "Controls", "Growth"] },
  { id: "hr", group: "Enabling Foundation", category: "Enabling Function", name: "HR", desc: "Talent acquisition, culture and GenNext leadership readiness.", tags: ["Talent", "Culture", "GenNext"] },
  { id: "legal", group: "Enabling Foundation", category: "Enabling Function", name: "Legal & Statutory", desc: "Compliance, intellectual-property protection and corporate governance.", tags: ["Compliance", "IP", "Governance"] },
  { id: "it", group: "Enabling Foundation", category: "Enabling Function", name: "IT Infrastructure", desc: "ERP systems, networks and the cybersecurity backbone.", tags: ["ERP", "Networks", "Security"] },
  { id: "saas", group: "Enabling Foundation", category: "Enabling Function", name: "AI/ML", desc: "Digital platforms and SaaS connecting every function end-to-end.", tags: ["SaaS", "Digital Platforms", "Integration"] },
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
                className={`group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                  active === i
                    ? "border-cyan/40 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-4">
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
          <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-navy via-ink to-navy sm:h-[520px]">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(70% 70% at 70% 30%, rgba(22,197,233,0.14), transparent 70%)" }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col justify-between p-8 md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold text-cyan-soft backdrop-blur">
                    Operational Backbone
                  </span>
                  <span className="font-display text-7xl font-extrabold leading-none text-white/[0.07] md:text-8xl">
                    {`0${active + 1}`.slice(-2)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{f.name}</h3>
                  <p className="mt-3 max-w-md text-white/70">{f.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {f.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
