"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const ROTATING = [
  "Energy Security",
  "Defence Self-Reliance",
  "Food Security",
  "Indigenous Engineering",
  "Advanced Manufacturing",
];

const STATS = [
  { v: "35+", l: "Years", sub: "Of engineering excellence" },
  { v: "400K+", l: "Installations", sub: "Deployed worldwide" },
  { v: "20+", l: "Countries", sub: "Across three continents" },
];

export default function Hero() {
  const ref = useRef(null);
  const [phrase, setPhrase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  useEffect(() => {
    const t = setInterval(() => setPhrase((p) => (p + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

  const goEcosystem = (e) => {
    e.preventDefault();
    const el = document.getElementById("ecosystem");
    if (window.__lenis && el) window.__lenis.scrollTo(el, { duration: 1.6 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      ref={ref}
      className="bg-offwhite px-4 pb-10 pt-24 sm:px-6 sm:pt-28"
    >
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[1.75rem] bg-ink text-paper shadow-soft sm:rounded-[2.25rem]">
        {/* background building image */}
        <motion.div style={{ scale: scaleImg }} className="absolute inset-0">
          <Image
            src="/images/hero-building.jpg"
            alt="KALA Group Corporate & R&D Centre, Pune"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
        {/* green cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/40" />
        <div className="absolute inset-0 bg-grid opacity-[0.08]" />

        {/* content */}
        <div className="relative z-10 flex min-h-[600px] flex-col justify-between p-7 sm:min-h-[720px] sm:p-12 lg:p-14">
          {/* top meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-start justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-paper/65 sm:text-xs"
          >
            <p>01 — KALA Group · Pune, India</p>
            <p className="hidden sm:block">Energy · Defence · Food Security</p>
          </motion.div>

          {/* monumental headline */}
          <div className="py-10">
            <h1 className="font-serif font-medium leading-[0.84] tracking-[-0.04em]">
              <Reveal delay={0.3}>
                <span className="block text-[20vw] sm:text-[15vw] lg:text-[11rem]">KALA</span>
              </Reveal>
              <Reveal delay={0.45}>
                <span className="block -mt-[0.16em] pb-[0.18em] pl-[0.05em] text-[12vw] font-light italic leading-[1.1] text-cyan-soft sm:text-[9vw] lg:text-[6rem]">
                  group
                </span>
              </Reveal>
            </h1>

            <div className="mt-6 flex h-7 items-center gap-2 pl-1 text-base text-paper/70 sm:text-lg">
              <span>Engineering</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={phrase}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-semibold text-paper"
                >
                  {ROTATING[phrase]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* bottom: copy + CTA on the left, stat cards on the right */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-md">
              <p className="text-base leading-relaxed text-paper/80 sm:text-lg">
                Three decades engineering India&apos;s power, defence, clean-energy
                and food-security future — designed in India, deployed worldwide.
              </p>
              <motion.a
                href="#ecosystem"
                onClick={goEcosystem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="group mt-6 inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-cyan-soft"
              >
                Explore the Ecosystem
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </motion.a>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.1 }}
                  className="rounded-2xl border border-paper/15 bg-paper/10 p-4 backdrop-blur-md sm:p-5"
                >
                  <p className="font-display text-2xl font-extrabold tracking-tight text-paper sm:text-3xl">
                    {s.v}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-soft">
                    {s.l}
                  </p>
                  <p className="mt-1.5 hidden text-[11px] leading-snug text-paper/55 sm:block">
                    {s.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, delay }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
