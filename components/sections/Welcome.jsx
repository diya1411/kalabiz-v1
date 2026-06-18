"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

const PRODUCTS = [
  { img: "/images/products/genset-25kva.jpg", label: "Gensets", sub: "5 kVA – 5 MW", contain: true },
  { img: "/images/ground-systems.jpg", label: "Defence Systems", sub: "Ground & engineering systems" },
  { img: "/images/products/bridge.jpg", label: "Military Bridges", sub: "Deployable bridging" },
  { img: "/images/products/biotech.jpg", label: "Biotech", sub: "Tissue culture & cold storage" },
  { img: "/images/eco-electrolyser.jpg", label: "Eco Green Energy", sub: "Hydrogen · solar · BESS" },
  { img: "/images/control-panel.jpg", label: "Power Electronics", sub: "Panels & controllers" },
  { img: "/images/crane-facility.jpg", label: "Cranes & Industries", sub: "Cranes & engineering" },
  { img: "/images/mobility.jpg", label: "Care Global", sub: "Service & lifecycle" },
  { img: "/images/products/genset-1000kva.jpg", label: "HHP Gensets", sub: "High-horsepower power", contain: true },
  { img: "/images/products/power-container.jpg", label: "Power Plants", sub: "Containerised power" },
];

const half = Math.ceil(PRODUCTS.length / 2);
const PRODUCT_COLS = [PRODUCTS.slice(0, half), PRODUCTS.slice(half)];

export default function Welcome() {
  return (
    <section className="relative overflow-hidden bg-offwhite py-24 md:py-32">
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
              defence, clean energy, biotech and digital platforms — designed
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

        {/* RIGHT — auto-scrolling product images */}
        <div className="marquee-wall relative h-[440px] overflow-hidden rounded-3xl sm:h-[520px]">
          <div className="grid h-full grid-cols-2 gap-4">
            {PRODUCT_COLS.map((col, ci) => (
              <div
                key={ci}
                className={`marquee-col flex flex-col gap-4 ${ci === 1 ? "down" : ""}`}
                style={{ "--speed": `${34 + ci * 8}s` }}
              >
                {[...col, ...col].map((p, i) => (
                  <figure
                    key={ci + "-" + i}
                    className="flex-none overflow-hidden rounded-2xl border border-gray-line bg-white shadow-soft"
                  >
                    <div className="relative aspect-[4/3] bg-white">
                      <Image src={p.img} alt={p.label} fill sizes="25vw" className={p.contain ? "object-contain p-3" : "object-cover"} />
                    </div>
                    <figcaption className="border-t border-gray-line px-4 py-2.5">
                      <p className="font-display text-sm font-bold leading-tight text-ink">{p.label}</p>
                      {p.sub && <p className="text-[11px] text-gray-soft">{p.sub}</p>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-offwhite to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-offwhite to-transparent" />
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
                decimals={s.decimals || 0}
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

function Check() {
  return (
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue/10">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path d="M5 13l4 4L19 7" stroke="#1f6dff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
