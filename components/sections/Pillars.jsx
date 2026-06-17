"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Energy Security",
    items: [
      "Diesel, Gas, Hydrogen fuel cells, Solar",
      "BESS (battery) & PCM (thermal) storage",
      "Micro-grid power distribution",
      "Smart energy for cities & factories",
    ],
    outcome: "Lower grid dependence, faster growth, cleaner energy",
    tone: "blue",
    Art: EnergyArt,
  },
  {
    n: "02",
    title: "Defence Systems",
    items: [
      "Power for radar, submarines, ground units",
      "Army bridges & knuckle boom cranes",
      "AI-based Health & Usage Monitoring",
      "Pulse power & lightweight alloys R&D",
    ],
    outcome: "Defence manufacturing hub, export-ready tech",
    tone: "navy",
    Art: DefenceArt,
  },
  {
    n: "03",
    title: "Food Security",
    items: [
      "Grain & onion preservation systems",
      "AI-based quality analysis",
      "Energy-efficient cold & dry storage",
      "Chemical-free shelf life extension",
    ],
    outcome: "Reduced post-harvest losses, farmer prosperity",
    tone: "cyan",
    Art: FoodArt,
  },
];

export default function Pillars() {
  const [hover, setHover] = useState(0);

  return (
    <section id="pillars" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full bg-grid" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, rgba(31,109,255,0.25), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="04" className="justify-center !text-cyan-soft">
            Three Strategic Pillars
          </SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl">
            <TextReveal text="Contributing to building India's future." />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/55">
            One conglomerate addressing the three foundations of a self-reliant
            nation — powered by indigenous engineering and advanced manufacturing.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {PILLARS.map((p, i) => (
            <PillarCard
              key={p.n}
              {...p}
              active={hover === i}
              onHover={() => setHover(i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ n, title, items, outcome, tone, Art, active, onHover, index }) {
  const accent =
    tone === "blue" ? "#1f6dff" : tone === "cyan" ? "#16c5e9" : "#5b8def";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={onHover}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 ${
        active ? "border-white/25 bg-white/[0.07]" : "border-white/10 bg-white/[0.03]"
      } lg:min-h-[520px]`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(60% 60% at 50% 0%, ${accent}22, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-xs text-white/40">{n}</span>
        <motion.span
          animate={{ scale: active ? 1.1 : 1, opacity: active ? 1 : 0.6 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: `${accent}1f`, color: accent }}
        >
          <Art />
        </motion.span>
      </div>

      <h3 className="relative mt-10 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h3>

      <ul className="relative mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-[15px] leading-snug text-white/75">
            <span
              className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full"
              style={{ background: accent }}
            />
            {it}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-8">
        <div
          className="rounded-2xl border border-white/10 p-4"
          style={{ background: `${accent}12` }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
            Key Outcome
          </p>
          <p className="mt-1.5 text-sm font-medium text-white/85">{outcome}</p>
        </div>
      </div>
    </motion.div>
  );
}

function EnergyArt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" fill="currentColor" />
    </svg>
  );
}
function DefenceArt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function FoodArt() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 2c4 3 6 6 6 10a6 6 0 11-12 0c0-4 2-7 6-10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
