"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const NODES = [
  { id: "hub", label: "KALA", x: 50, y: 50, hub: true },
  { id: "mfg", label: "Manufacturing", x: 22, y: 24, detail: "6 facilities · 2 Million sq ft" },
  { id: "rnd", label: "R&D Centres", x: 78, y: 22, detail: "100+ engineers" },
  { id: "partners", label: "Technology Partners", x: 88, y: 54, detail: "10+ exclusive" },
  { id: "service", label: "Service Network", x: 74, y: 82, detail: "PAN-India · 14 districts" },
  { id: "customers", label: "Customers", x: 44, y: 88, detail: "800+ corporates" },
  { id: "gov", label: "Govt Collaborations", x: 16, y: 74, detail: "Army · DRDO · ISRO · BEL" },
  { id: "global", label: "Global Presence", x: 12, y: 50, detail: "20+ countries" },
];

const EDGES = ["mfg", "rnd", "partners", "service", "customers", "gov", "global"];

export default function Network() {
  const ref = useRef(null);
  const [active, setActive] = useState("hub");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const draw = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const hub = NODES[0];
  const activeNode = NODES.find((n) => n.id === active) || hub;

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
      <div className="absolute inset-0 opacity-10 bg-grid" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(22,197,233,0.18), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionLabel index="06" className="!text-cyan-soft">Our Network</SectionLabel>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              <TextReveal text="An ecosystem" />
              <br />
              <TextReveal text="built to scale." className="text-cyan-soft" />
            </h2>
            <p className="mt-5 max-w-md text-lg text-white/55">
              Manufacturing, research, partners, service and government — one
              connected network powering delivery across the country and beyond.
            </p>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 inline-flex flex-col rounded-2xl border border-white/15 bg-white/5 px-5 py-4"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-soft">
                {activeNode.hub ? "The Nucleus" : "Network Node"}
              </span>
              <span className="mt-1 font-display text-xl font-bold">{activeNode.label}</span>
              {activeNode.detail && (
                <span className="mt-0.5 text-sm text-white/55">{activeNode.detail}</span>
              )}
            </motion.div>
          </div>

          {/* node map */}
          <div className="relative aspect-square w-full">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="hubGlow">
                  <stop offset="0%" stopColor="#16c5e9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#16c5e9" stopOpacity="0" />
                </radialGradient>
              </defs>
              {EDGES.map((id) => {
                const n = NODES.find((x) => x.id === id);
                return (
                  <motion.line
                    key={id}
                    x1={hub.x}
                    y1={hub.y}
                    x2={n.x}
                    y2={n.y}
                    stroke={active === id ? "#16c5e9" : "rgba(255,255,255,0.25)"}
                    strokeWidth={active === id ? 0.5 : 0.25}
                    style={{ pathLength: draw }}
                  />
                );
              })}
            </svg>

            {NODES.map((n, i) => (
              <button
                key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.hub ? (
                  <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue to-cyan font-display text-base font-extrabold shadow-glow">
                    <span className="absolute h-full w-full animate-[pulse-ring_3s_ease-out_infinite] rounded-full border border-cyan" />
                    {n.label}
                  </span>
                ) : (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold backdrop-blur transition-colors ${
                      active === n.id
                        ? "border-cyan/60 bg-cyan/15 text-white"
                        : "border-white/15 bg-white/5 text-white/70"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${active === n.id ? "bg-cyan" : "bg-white/40"}`} />
                    {n.label}
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
