"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

// Featured banner images cycle through these
const FEATURED = [
  { img: "/images/gallery/team-kala.jpg", tag: "Team KALA", title: "One family. One mission." },
  { img: "/images/gallery/team-kala-2.jpg", tag: "Team KALA", title: "Together, we build the future." },
];

const GALLERY = [
  { img: "/images/gallery/csr-team-wide.jpg", label: "One family. One mission.", tag: "Team KALA", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/flagoff-1.jpg", label: "Flag-off ceremony", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-tree-1.jpg", label: "Vriksharopan tree plantation", tag: "KALA Foundation", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/csr-health-1.jpg", label: "Varkari Health Camp", tag: "CSR Initiative", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/flagoff-2.jpg", label: "Dispatch flag-off", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-independence-1.jpg", label: "Independence Day flag hoisting", tag: "Independence Day", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-kpl-1.jpg", label: "KALA Premier League", tag: "Staff Welfare", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/flagoff-3.jpg", label: "First dispatch — Defence & Aerospace", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-blood-1.jpg", label: "Blood donation camp", tag: "CSR Initiative", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-tree-4.jpg", label: "Tree plantation drive", tag: "KALA Foundation", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/flagoff-4.jpg", label: "Pooja before dispatch", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-independence-2.jpg", label: "Independence Day celebration", tag: "Independence Day", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-school-1.jpg", label: "School digital lab donation", tag: "CSR Initiative", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/flagoff-7.jpg", label: "Team at the flag-off", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-birthday-1.jpg", label: "Birthday celebration", tag: "Staff Welfare", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/csr-vaccine-1.jpg", label: "Covid vaccination camp", tag: "CSR Initiative", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/flagoff-5.jpg", label: "Dispatch ceremony", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-ganpati-1.jpg", label: "Ganpati installation", tag: "Staff Welfare", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-health-3.jpg", label: "Health camp", tag: "CSR Initiative", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/flagoff-6.jpg", label: "Flag-off ceremony", tag: "Flag Off", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-independence-4.jpg", label: "Flag hoisting at the plant", tag: "Independence Day", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/csr-tree-3.jpg", label: "Greening the campus", tag: "KALA Foundation", ratio: "aspect-[3/2]" },
];

// distribute photos round-robin into 4 columns for the moving wall
const COLUMNS = [[], [], [], []];
GALLERY.forEach((g, i) => COLUMNS[i % 4].push(g));

export default function Events() {
  const [feat, setFeat] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFeat((f) => (f + 1) % FEATURED.length), 4500);
    return () => clearInterval(id);
  }, []);
  const active = FEATURED[feat];

  return (
    <section id="events" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel index="12" className="!text-cyan-soft">Celebrations & Events</SectionLabel>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            <TextReveal text="Moments that" />{" "}
            <TextReveal text="define us." className="text-cyan-soft" />
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/55">
            Beyond engineering — KALA Rajani nights, Independence Day, Kids Day,
            sports meets and the KALA Foundation's CSR drives that bring the
            family together.
          </p>
        </div>

        {/* featured team photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative mt-14 overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="relative aspect-[30/7] w-full">
            <AnimatePresence mode="sync">
              <motion.div
                key={active.img}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={active.img}
                  alt={active.tag}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-soft backdrop-blur">
              {active.tag}
            </span>
            <AnimatePresence mode="wait">
              <motion.h3
                key={active.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="mt-3 font-display text-2xl font-extrabold md:text-3xl"
              >
                {active.title}
              </motion.h3>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* moving grid wall */}
        <div className="marquee-wall relative mt-8 grid h-[560px] grid-cols-2 gap-3 overflow-hidden sm:h-[640px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className={`marquee-col flex flex-col gap-3 sm:gap-4 ${ci % 2 === 1 ? "down" : ""} ${ci === 2 ? "hidden sm:flex" : ""} ${ci === 3 ? "hidden lg:flex" : ""}`}
              style={{ "--speed": `${38 + ci * 7}s` }}
            >
              {[...col, ...col].map((g, i) => (
                <Tile key={ci + "-" + i} g={g} />
              ))}
            </div>
          ))}
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Tile({ g }) {
  return (
    <figure className="group/tile relative block shrink-0 overflow-hidden rounded-2xl border border-white/10">
      <div className={`relative w-full ${g.ratio}`}>
        <Image
          src={g.img}
          alt={g.label}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover/tile:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100" />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-3.5 opacity-0 transition-all duration-300 group-hover/tile:translate-y-0 group-hover/tile:opacity-100">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-soft">{g.tag}</p>
        <p className="font-display text-sm font-bold text-white">{g.label}</p>
      </figcaption>
    </figure>
  );
}
