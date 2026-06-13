"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const GALLERY = [
  { img: "/images/gallery/ev-rajani-2.jpg", label: "KALA Rajani — cultural night", tag: "Annual Event", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-independence-1.jpg", label: "Independence Day flag hoisting", tag: "Independence Day", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-womens-day.jpg", label: "Women's Day celebration", tag: "Staff Welfare", ratio: "aspect-[21/9]" },
  { img: "/images/gallery/ev-kids-1.jpg", label: "Kids Day fun", tag: "Kids Day", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/ev-rajani-3.jpg", label: "On-stage performance", tag: "KALA Rajani", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-welfare-1.jpg", label: "Sports & team spirit", tag: "Staff Welfare", ratio: "aspect-[4/3]" },
  { img: "/images/gallery/ev-tree-1.jpg", label: "Vriksharopan tree plantation", tag: "KALA Foundation", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-rajani-1.jpg", label: "Rajani folk act", tag: "KALA Rajani", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/ev-kids-2.jpg", label: "Little champions", tag: "Kids Day", ratio: "aspect-[2/1]" },
  { img: "/images/gallery/ev-engineers-day.jpg", label: "Engineers' Day", tag: "Staff Welfare", ratio: "aspect-[21/9]" },
  { img: "/images/gallery/ev-independence-2.jpg", label: "Team on parade", tag: "Independence Day", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-rajani-4.jpg", label: "Dance showcase", tag: "KALA Rajani", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-health-1.jpg", label: "Health & blood-donation camp", tag: "KALA Foundation", ratio: "aspect-[3/2]" },
  { img: "/images/gallery/ev-welfare-2.jpg", label: "Annual sports meet", tag: "Staff Welfare", ratio: "aspect-[5/2]" },
  { img: "/images/gallery/ev-tree-2.jpg", label: "Let's make a better planet", tag: "KALA Foundation", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/ev-rajani-5.jpg", label: "Lights, stage, KALA", tag: "KALA Rajani", ratio: "aspect-[16/9]" },
  { img: "/images/gallery/ev-kids-3.jpg", label: "Creative corner", tag: "Kids Day", ratio: "aspect-[16/9]" },
];

// distribute photos round-robin into 4 columns for the moving wall
const COLUMNS = [[], [], [], []];
GALLERY.forEach((g, i) => COLUMNS[i % 4].push(g));

export default function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel index="11" className="!text-cyan-soft">Celebrations & Events</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
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
            <Image
              src="/images/gallery/team-kala.jpg"
              alt="Team KALA"
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <span className="rounded-full bg-cyan/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-soft backdrop-blur">
              Team KALA
            </span>
            <h3 className="mt-3 font-display text-2xl font-extrabold md:text-3xl">
              One family. One mission.
            </h3>
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
