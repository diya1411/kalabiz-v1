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
  { v: "35+", l: "Years" },
  { v: "4 Lakh+", l: "Installations" },
  { v: "10+", l: "Countries" },
];

export default function Hero() {
  const ref = useRef(null);
  const [phrase, setPhrase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

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
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      {/* full-bleed building image */}
      <motion.div style={{ y: yImg, scale: scaleImg }} className="absolute inset-0">
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

      {/* top meta row */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-start justify-between px-6 pt-28 sm:pt-32"
      >
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-paper/70">
          <p>KALA Group</p>
          <p className="mt-1 text-paper/45">Est. 1991 · Engineering with meaning</p>
        </div>
        <div className="hidden flex-col items-end gap-1 text-right text-xs font-medium uppercase tracking-[0.18em] text-paper/60 sm:flex">
          <span>— Energy</span>
          <span>— Defence</span>
          <span>— Food Security</span>
        </div>
      </motion.div>

      {/* monumental headline */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6"
      >
        <h1 className="font-display font-extrabold leading-[0.84] tracking-[-0.04em]">
          <Reveal delay={0.3}>
            <span className="block text-[22vw] sm:text-[17vw] lg:text-[13rem]">KALA</span>
          </Reveal>
          <Reveal delay={0.45}>
            <span className="block -mt-[0.18em] pl-[0.05em] pb-[0.18em] text-[13vw] font-light italic leading-[1.1] text-cyan-soft sm:text-[10vw] lg:text-[7rem]">
              group
            </span>
          </Reveal>
        </h1>

        <div className="mt-7 flex h-7 items-center gap-2 pl-1 text-base text-paper/70 sm:text-lg">
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
      </motion.div>

      {/* bottom: stats + CTA, kept minimal */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10"
      >
        <div className="flex flex-col items-start justify-between gap-6 border-t border-paper/10 pt-6 sm:flex-row sm:items-center">
          <div className="flex gap-8">
            {STATS.map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-extrabold text-paper">{s.v}</p>
                <p className="text-[11px] uppercase tracking-wider text-paper/50">{s.l}</p>
              </div>
            ))}
          </div>

          <motion.a
            href="#ecosystem"
            onClick={goEcosystem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="group inline-flex items-center gap-3 rounded-full bg-paper px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-cyan-soft"
          >
            Explore the Ecosystem
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:translate-x-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.a>
        </div>
      </motion.div>
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
