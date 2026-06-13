"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const FACILITIES = [
  {
    id: "hq",
    name: "Corporate & R&D Centre — Pune",
    place: "Pune, Maharashtra",
    img: "/images/plant-corporate.jpg",
    blurb: "The nucleus — world-class R&D with 100+ engineers, ERP-driven processes and the mentor network.",
    tags: ["R&D Team", "ERP Systems", "Design Capabilities", "AI/ML"],
  },
  {
    id: "genset1",
    name: "Plant 1 — Chakan",
    place: "Chakan, Pune",
    img: "/images/plant-genset1.jpg",
    blurb: "DGQA-registered diesel & gas genset line — CPCB IV+ compliant, building gensets from 5 kVA to 5 MW.",
    tags: ["DGQA Approved", "CPCB IV+", "Gas & Dual-Fuel"],
  },
  {
    id: "genset4",
    name: "Plant 4 — Chakan",
    place: "Chakan, Pune",
    img: "/images/plant-genset4.jpg",
    blurb: "Genset assembly, synchronisation and distribution-panel integration with an approved capacity of 30,000 units a year.",
    tags: ["30,000 units/yr", "Synchro Panels", "Load Testing"],
  },
  {
    id: "blr",
    name: "Plant 5 — Bengaluru",
    place: "Bengaluru, Karnataka",
    img: "/images/plant-bengaluru.jpg",
    blurb: "Control panels, wiring harness and electronics manufacturing — CPRI approved, ESD compliant.",
    tags: ["CPRI Approved", "Panels & Harness", "ESD Compliant"],
  },
  {
    id: "biotech",
    name: "Kala Biotech",
    place: "Talegaon, Pune",
    img: "/images/plant-biotech.jpg",
    blurb: "NCS-TCP recognised plant tissue-culture and preservation R&D for agri & food-security programmes.",
    tags: ["NCS-TCP", "Tissue Culture", "Preservation R&D"],
  },
  {
    id: "freeze",
    name: "Kala Freeze n Cold Facility",
    place: "Talegaon, Pune",
    img: "/images/plant-freeze.jpg",
    blurb: "Patented Controlled Atmosphere storage and cold-chain technology with Kkloud IoT monitoring.",
    tags: ["CA Storage", "Cold Chain", "KBPL Onion Storage"],
  },
  {
    id: "defence",
    name: "Plant 6 — Talegaon",
    place: "Talegaon, Pune",
    img: "/images/plant-defence.jpg",
    blurb: "Crane & defence integrated facility — robotic welding, VMC, CNC and in-house bridge & crane load testing under ISO 9001:2015.",
    tags: ["ISO 9001:2015", "Bridge Testing", "Robotic Welding"],
  },
];

const STATS = [
  { v: "6", l: "Manufacturing Facilities" },
  { v: "5 Lakh", l: "Sq Ft Own Infrastructure" },
  { v: "100+", l: "R&D Engineers" },
  { v: "3", l: "Continents" },
];

export default function Facilities() {
  const [active, setActive] = useState(0);
  const f = FACILITIES[active];

  return (
    <section id="facilities" className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 80% 20%, rgba(22,197,233,0.16), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel index="09" className="!text-cyan-soft">Our Facilities</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            <TextReveal text="Where it all" />{" "}
            <TextReveal text="gets built." className="text-cyan-soft" />
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/55">
            Six state-of-the-art plants across Maharashtra and Karnataka — engineered
            to the highest standards of quality and monitoring.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* selectable list */}
          <div className="flex flex-col gap-2.5">
            {FACILITIES.map((item, i) => (
              <button
                key={item.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                  active === i
                    ? "border-cyan/40 bg-white/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs transition-colors ${
                      active === i ? "text-cyan-soft" : "text-white/40"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-bold leading-tight">{item.name}</p>
                    <p className="text-sm text-white/50">{item.place}</p>
                  </div>
                  <motion.span
                    animate={{ x: active === i ? 0 : -6, opacity: active === i ? 1 : 0 }}
                    className="text-cyan-soft"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.span>
                </div>
                {active === i && (
                  <motion.span
                    layoutId="facility-active"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue to-cyan"
                  />
                )}
              </button>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {STATS.map((s) => (
                <div key={s.l} className="bg-navy p-4">
                  <p className="font-display text-2xl font-extrabold text-cyan-soft">{s.v}</p>
                  <p className="mt-0.5 text-xs text-white/55">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* image preview */}
          <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/15 sm:h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image src={f.img} alt={f.name} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <motion.div
              key={`txt-${f.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="absolute inset-x-0 bottom-0 p-6 md:p-8"
            >
              <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold text-cyan-soft backdrop-blur">
                {f.place}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold md:text-3xl">{f.name}</h3>
              <p className="mt-2 max-w-lg text-sm text-white/70">{f.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
