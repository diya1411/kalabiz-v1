"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import LocationsMap from "@/components/LocationsMap";
import { STATS as METRICS } from "@/components/companyStats";

export default function GlobalPresence() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="absolute inset-0 opacity-[0.06] bg-grid" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionLabel index="11" className="!text-cyan-soft">Global Presence</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              <TextReveal text="Scale you can" />
              <br />
              <TextReveal text="measure." className="text-cyan-soft" />
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/55">
              Three decades, three continents, 400K+ installations — a footprint
              engineered in India and trusted worldwide.
            </p>

            {/* locations map */}
            <div className="mt-9">
              <LocationsMap />
            </div>
          </div>

          {/* metrics grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group bg-ink p-6 transition-colors hover:bg-navy"
              >
                <AnimatedCounter
                  value={m.value}
                  suffix={m.suffix}
                  decimals={m.decimals || 0}
                  className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl"
                />
                <p className="mt-1.5 text-xs font-medium text-white/50">{m.label}</p>
                <span className="mt-3 block h-0.5 w-6 bg-cyan/40 transition-all duration-500 group-hover:w-12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
