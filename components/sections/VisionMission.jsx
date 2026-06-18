"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const PILLARS = [
  {
    key: "vision",
    label: "Vision",
    text: "To empower the world with innovative technologies and change the face of the power-management industry.",
    Icon: VisionIcon,
  },
  {
    key: "mission",
    label: "Mission",
    text: "To be an exemplary engineering enterprise — excellence in manufacturing, quality, service reach and ultimate customer satisfaction.",
    Icon: MissionIcon,
  },
];

// Latest milestones — update or prepend new entries as they happen
const NEWS = [
  { date: "Jan 2026", tag: "Defence", title: "KALA Defence & Aerospace awarded SAMAR Level 4 by QCI–DRDO." },
  { date: "Jan 2026", tag: "Quality", title: "Articulated Knuckle Boom Crane certified to IS 4573:2020 by SGS." },
  { date: "Jan 2025", tag: "Certification", title: "KALA Genset recertified to ISO 9001, ISO 14001 & ISO 45001." },
  { date: "Nov 2023", tag: "Patent", title: "Patent granted for Onion Bulb Storage Structure, jointly with ICAR." },
];

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>Vision, Mission & News</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
            <TextReveal text="Why we" />{" "}
            <TextReveal text="build." className="text-gradient" />
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT — vision & mission stacked */}
          <div className="flex flex-col gap-6">
            {PILLARS.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex-1 overflow-hidden rounded-3xl border border-gray-line bg-offwhite p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow md:p-10"
              >
                <span className="pointer-events-none absolute -right-2 -top-5 font-display text-[7rem] font-extrabold leading-none text-ink/[0.035] transition-colors duration-500 group-hover:text-blue/10">
                  {item.label}
                </span>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-blue to-cyan text-white shadow-glow">
                  <item.Icon />
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-extrabold tracking-tight text-ink">{item.label}</h3>
                <p className="relative mt-3 text-lg leading-relaxed text-ink/70">{item.text}</p>
                <span className="relative mt-6 block h-0.5 w-8 bg-gradient-to-r from-blue to-cyan transition-all duration-500 group-hover:w-16" />
              </motion.div>
            ))}
          </div>

          {/* RIGHT — news */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-3xl border border-gray-line bg-ink p-8 text-white shadow-soft md:p-10"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">Newsroom</h3>
              <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold text-cyan-soft">Latest</span>
            </div>

            <div className="mt-6 flex flex-col divide-y divide-white/10">
              {NEWS.map((n, i) => (
                <motion.a
                  key={n.title}
                  href="#"
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  className="group flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="font-mono text-cyan-soft">{n.date}</span>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 font-medium text-white/60">{n.tag}</span>
                  </div>
                  <p className="text-sm leading-snug text-white/85 transition-colors group-hover:text-cyan-soft">
                    {n.title}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function VisionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MissionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}
