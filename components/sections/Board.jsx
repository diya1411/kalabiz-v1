"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const MEMBERS = [
  {
    name: "Manojkumar Phutane",
    role: "Managing Director",
    img: "/images/dir-manoj.jpg",
    exp: "37 Years",
    title: "A Sharp Entrepreneur with Foresight",
    bio: "An electrical engineer with 37 years of rich experience across manufacturing and technology — the founding force behind KALA's engineering vision.",
  },
  {
    name: "Sanjaykumar Phutane",
    role: "Executive Director",
    img: "/images/dir-sanjay.jpg",
    exp: "30 Years",
    title: "A Dynamic Technocrat",
    bio: "An electronic engineer with 30 years of rich experience in marketing and technology, driving KALA's market expansion across three continents.",
  },
  {
    name: "Dr. Praveenkumar Phutane",
    role: "Executive Director",
    img: "/images/dir-praveen.jpg",
    exp: "25 Years",
    title: "An Innovative Thinker",
    bio: "A Doctor and MBA in Business Development with 25 years in R&D, product development and operations — the engine of KALA's innovation.",
  },
];

export default function Board() {
  return (
    <section id="board" className="relative overflow-hidden bg-offwhite py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="13" className="justify-center">Leadership</SectionLabel>
          <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink md:text-6xl">
            <TextReveal text="Guided by" />{" "}
            <TextReveal text="experience." className="text-gradient" />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-soft">
            The leadership steering KALA toward a globally competitive, future-ready
            enterprise — over nine decades of combined engineering experience.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((m, i) => (
            <MemberCard key={m.name} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ name, role, img, title, bio, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-gray-line bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glow"
    >
      {/* portrait */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
        <Image
          src={img}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-xl font-bold tracking-tight text-white">{name}</h3>
          <p className="text-sm font-semibold text-cyan-soft">{role}</p>
        </div>
      </div>

      <div className="px-1 pt-4">
        <p className="font-display text-sm font-bold text-ink">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{bio}</p>
      </div>
    </motion.div>
  );
}
