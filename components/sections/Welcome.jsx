"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/components/companyStats";

const HIGHLIGHTS = [
  "35+ Years Experience",
  "Engineering Excellence",
  "Global Presence",
  "Innovation First",
  "Advanced Manufacturing",
  "Technology Leadership",
];

export default function Welcome() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -90]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-offwhite py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* LEFT — story */}
        <div>
          <SectionLabel index="02">Welcome to KALA Group</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl">
            <TextReveal text="Three decades of" />{" "}
            <TextReveal text="engineering a" />{" "}
            <TextReveal text="sustainable tomorrow." className="text-gradient" />
          </h2>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">
              From a single power-solutions venture in 1991, KALA Group has grown
              into a vertically integrated engineering powerhouse spanning power,
              defence, clean energy, biotech and artificial intelligence — designed
              in India, deployed worldwide.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">
              World-class R&amp;D, 100+ engineers, six manufacturing facilities and
              presence across three continents — built on knowledge, quality and an
              unrelenting ability to innovate.
            </p>
          </FadeIn>

          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3.5">
            {HIGHLIGHTS.map((h, i) => (
              <FadeIn key={h} delay={0.05 * i} y={16}>
                <div className="flex items-center gap-2.5 text-sm font-medium text-ink">
                  <Check />
                  {h}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* RIGHT — premium imagery collage (real photos) */}
        <div className="relative h-[440px] sm:h-[520px]">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-[68%]">
            <PhotoCard src="/images/plant-corporate.jpg" label="Corporate & R&D Centre — Pune" ratio="aspect-[3/4]" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-2 left-0 w-[56%]">
            <PhotoCard src="/images/genset-fleet.jpg" label="DG-Set Manufacturing" ratio="aspect-[4/3]" contain />
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute bottom-24 right-2 w-[42%]">
            <PhotoCard src="/images/eco-electrolyser.jpg" label="Eco Green Energy" ratio="aspect-[4/3]" />
          </motion.div>
        </div>
      </div>

      {/* stats band */}
      <div className="mx-auto mt-16 max-w-7xl px-6 md:mt-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-gray-line bg-gray-line sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.06 }}
              className="bg-offwhite p-6"
            >
              <AnimatedCounter
                value={s.value}
                suffix={s.suffix}
                className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl"
              />
              <p className="mt-1.5 text-xs font-medium text-ink/55">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoCard({ src, label, ratio, contain }) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-3xl border border-white/60 shadow-soft ${contain ? "bg-white" : ""}`}>
      <Image
        src={src}
        alt={label}
        fill
        sizes="40vw"
        className={contain ? "object-contain p-4" : "object-cover"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <span className="absolute left-4 top-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
        KALA
      </span>
      <span className="absolute bottom-4 left-4 right-4 font-display text-sm font-bold text-white">
        {label}
      </span>
    </div>
  );
}

function Check() {
  return (
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue/10">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#1f6dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
