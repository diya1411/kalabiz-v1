"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const ITEMS = [
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

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel index="03">Vision & Mission</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
            <TextReveal text="Why we" />{" "}
            <TextReveal text="build." className="text-gradient" />
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-gray-line bg-offwhite p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow md:p-10"
            >
              {/* giant ghost word */}
              <span className="pointer-events-none absolute -right-2 -top-5 font-display text-[7rem] font-extrabold leading-none text-ink/[0.035] transition-colors duration-500 group-hover:text-blue/10">
                {item.label}
              </span>

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy via-blue to-cyan text-white shadow-glow">
                <item.Icon />
              </div>

              <h3 className="relative mt-6 font-display text-2xl font-extrabold tracking-tight text-ink">
                {item.label}
              </h3>
              <p className="relative mt-3 text-lg leading-relaxed text-ink/70">{item.text}</p>

              <span className="relative mt-6 block h-0.5 w-8 bg-gradient-to-r from-blue to-cyan transition-all duration-500 group-hover:w-16" />
            </motion.div>
          ))}
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
