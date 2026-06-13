"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const COMPANIES = [
  { name: "Kala Genset", short: "Power systems & gensets", angle: -90 },
  { name: "Kala Defence & Aerospace", short: "Mission-critical systems", angle: -45 },
  { name: "Kala Eco Green Energy", short: "Hydrogen · solar · BESS", angle: 0 },
  { name: "Kala Biotech", short: "Agri food preservation", angle: 45 },
  { name: "Kala Care Global", short: "Service & lifecycle", angle: 90 },
  { name: "Kala Power Electronics", short: "Converters & controllers", angle: 135 },
  { name: "Kala Cranes", short: "Engineering systems", angle: 180 },
  { name: "Kala AI/ML & SaaS", short: "AI Ashwmedh · platforms", angle: 225 },
];

export default function Ecosystem() {
  const ref = useRef(null);
  const [active, setActive] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 0]);

  const R = 290;

  return (
    <section
      id="ecosystem"
      ref={ref}
      className="relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid-fine opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="06" className="justify-center">
            The KALA Ecosystem
          </SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
            <TextReveal text="Eight companies." />
            <br />
            <TextReveal text="One engineering force." className="text-gradient" />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-soft">
            A vertically integrated conglomerate where power, defence, energy,
            biotech and AI orbit a single nucleus of indigenous engineering.
          </p>
        </div>

        <motion.div
          style={{ rotate }}
          className="relative mx-auto mt-16 hidden aspect-square w-full max-w-[760px] md:block"
        >
          {/* orbit rings */}
          {[0.55, 0.78, 1].map((s, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue/10"
              style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
            />
          ))}

          {/* connection lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 760">
            {COMPANIES.map((c, i) => {
              const rad = (c.angle * Math.PI) / 180;
              const x = 380 + Math.cos(rad) * R;
              const y = 380 + Math.sin(rad) * R;
              return (
                <motion.line
                  key={i}
                  x1="380"
                  y1="380"
                  x2={x}
                  y2={y}
                  stroke={active === i ? "#1f6dff" : "#c8d6ee"}
                  strokeWidth={active === i ? 2 : 1}
                  style={{ pathLength: grow }}
                />
              );
            })}
          </svg>

          {/* center node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-navy via-blue to-cyan text-white shadow-glow"
            >
              <span className="absolute h-full w-full animate-[pulse-ring_3s_ease-out_infinite] rounded-full border border-blue" />
              <span className="font-display text-2xl font-extrabold tracking-tight">KALA</span>
            </motion.div>
          </div>

          {/* orbiting nodes */}
          {COMPANIES.map((c, i) => {
            const rad = (c.angle * Math.PI) / 180;
            const x = Math.cos(rad) * R;
            const y = Math.sin(rad) * R;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="absolute left-1/2 top-1/2 z-10"
                style={{ x: x - 0, y: y - 0 }}
              >
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: active === i ? 1.08 : 1 }}
                    className={`w-44 cursor-default rounded-2xl border p-3.5 text-center transition-colors ${
                      active === i
                        ? "border-blue/40 bg-white shadow-glow"
                        : "border-gray-line bg-white/80 shadow-soft"
                    }`}
                  >
                    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-mist">
                      <Dot active={active === i} />
                    </div>
                    <p className="font-display text-sm font-bold leading-tight text-ink">
                      {c.name}
                    </p>
                    <p className="mt-1 text-[11px] leading-tight text-gray-soft">{c.short}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* mobile list */}
        <div className="mt-12 grid gap-3 md:hidden">
          {COMPANIES.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-2xl border border-gray-line bg-white p-4 shadow-soft"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mist">
                <Dot active />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink">{c.name}</p>
                <p className="text-xs text-gray-soft">{c.short}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dot({ active }) {
  return (
    <span
      className={`block h-3 w-3 rounded-full transition-colors ${
        active ? "bg-blue" : "bg-gray-soft/50"
      }`}
    />
  );
}
