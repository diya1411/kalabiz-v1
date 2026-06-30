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
  { id: "marketing", category: "Core Function", name: "Marketing", img: "/images/gallery/life-21.jpg", desc: "Brand building, demand generation and market reach across every KALA vertical.", tags: ["Brand & Demand", "Campaigns", "Market Reach"] },
  { id: "sales", category: "Core Function", name: "Sales", img: "/images/gallery/team-kala.jpg", desc: "A pan-India and global sales network converting pipeline into installations.", tags: ["Pan-India Network", "Global Sales", "Key Accounts"] },
  { id: "rnd", category: "Core Function", name: "R&D", img: "/images/gallery/3d-printing.jpg", desc: "100+ engineers driving design, indigenisation and continuous innovation.", tags: ["100+ Engineers", "Design", "Indigenisation"] },
  { id: "production", category: "Core Function", name: "Production", img: "/images/gallery/assembly-line.jpg", desc: "Six plants manufacturing gensets and systems from 5 kVA to 5 MW.", tags: ["6 Plants", "5 kVA – 5 MW", "CPCB IV+"] },
  { id: "support", category: "Core Function", name: "Product Support", img: "/images/care-service-1.jpg", desc: "AMC, spares and reconditioning delivering full-lifecycle care.", tags: ["AMC", "Spares", "Reconditioning"] },
  { id: "projects", category: "Core Function", name: "Project Division", img: "/images/gallery/deployment.jpg", desc: "Turnkey project delivery from design through erection and commissioning.", tags: ["Turnkey", "Design-to-Erection", "Commissioning"] },
  { id: "quality", category: "Core Function", name: "Quality Systems", img: "/images/gallery/dg-testing.jpg", desc: "ISO, DGQA and CPCB IV+ assurance embedded across every line.", tags: ["ISO 9001", "DGQA", "CPCB IV+"] },
  { id: "finance", category: "Enabling Function", name: "Finance", img: "/images/plant-corporate.jpg", desc: "Capital allocation, financial controls and funding for growth.", tags: ["Capital", "Controls", "Growth"] },
  { id: "hr", category: "Enabling Function", name: "HR", img: "/images/gallery/real-team.jpg", desc: "Talent acquisition, culture and GenNext leadership readiness.", tags: ["Talent", "Culture", "GenNext"] },
  { id: "legal", category: "Enabling Function", name: "Legal & Statutory", img: "/images/facility-aerial.jpg", desc: "Compliance, intellectual-property protection and corporate governance.", tags: ["Compliance", "IP", "Governance"] },
  { id: "it", category: "Enabling Function", name: "IT Infrastructure", img: "/images/control-panel.jpg", desc: "ERP systems, networks and the cybersecurity backbone.", tags: ["ERP", "Networks", "Security"] },
  { id: "saas", category: "Enabling Function", name: "AI/ML", img: "/images/ver-ai.jpg", desc: "Digital platforms and SaaS connecting every function end-to-end.", tags: ["SaaS", "Digital Platforms", "Integration"] },
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
