"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const VALUES = [
  { letter: "K", title: "Knowledge & Quality", sub: "Par Excellence" },
  { letter: "A", title: "Ability", sub: "to Innovate & Integrate" },
  { letter: "L", title: "Loyalty", sub: "towards Stakeholders" },
  { letter: "A", title: "Adaptability", sub: "to GenNext Aspirations" },
];

export default function CoreValues() {
  return (
    <section className="relative overflow-hidden bg-offwhite py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="04" className="justify-center">Core Values</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
            <TextReveal text="The core values" />{" "}
            <TextReveal text="of KALA." className="text-gradient" />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-soft">
            Core values we engineer by — spelling out who we are.
          </p>
        </div>

        {/* horizontal row of all four values */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {VALUES.map((v, i) => (
            <ValueCard key={i} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ letter, title, sub, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-gray-line bg-white p-7 text-center shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
    >
      {/* giant ghost letter */}
      <span className="pointer-events-none absolute -top-6 right-2 font-display text-[8rem] font-extrabold leading-none text-ink/[0.04] transition-colors duration-500 group-hover:text-blue/10">
        {letter}
      </span>

      {/* fragment letter badge */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy via-blue to-cyan"
          initial={{ scale: 0.5, opacity: 0, rotate: -18 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
        {[0, 1].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-2xl border border-blue/30"
            initial={{ scale: 1, opacity: 0.6 }}
            whileInView={{ scale: 1.4 + k * 0.25, opacity: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3 + index * 0.12 + k * 0.15 }}
          />
        ))}
        <span className="relative font-display text-4xl font-extrabold text-white">{letter}</span>
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 font-display text-sm italic text-blue">{sub}</p>
    </motion.div>
  );
}
