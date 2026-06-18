"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";

/* Order and sub-domains exactly as per the KALA Verticals sheet */
const VERTICALS = [
  {
    n: "01",
    name: "Genset",
    img: "/images/ver-genset.jpg",
    items: [
      "Diesel Gensets",
      "LHP",
      "MHP",
      "HHP",
      "UHHP",
      "Natural Gas",
      "Hybrid",
      "Optiprime Gensets",
      "Mobile & Stationary",
      "Alternate Fuel & Custom Solutions",
      "Integrated Project Solutions",
    ],
  },
  {
    n: "02",
    name: "Defence",
    img: "/images/ver-defence.jpg",
    items: ["Ground Systems", "Engineering Systems", "Advanced Power Management"],
  },
  {
    n: "03",
    name: "Biotech",
    img: "/images/biotech-storage.jpg",
    items: [
      "Onion Preservation System",
      "Controlled Atmosphere Multi-Product Preservation",
      "Grading & Sorting",
      "Hopper · Inclined Conveyor · Tipper",
      "Bag Filling",
      "Plant Tissue Culture",
      "Molecular Biology Lab",
    ],
  },
  {
    n: "04",
    name: "Eco Green",
    img: "/images/eco-electrolyser.jpg",
    items: [
      "Solar",
      "Wind",
      "Energy Storage System",
      "Power Conversion System",
    ],
  },
  {
    n: "05",
    name: "Care Global",
    img: "/images/ver-care.jpg",
    items: [
      "Product Support (AMC, Spares & RECD)",
      "Reconditioning & Repowering",
      "Power Rental",
    ],
  },
  {
    n: "06",
    name: "Power Electronics",
    img: "/images/ver-power.jpg",
    items: [
      "Advanced Power Management",
      "Energy Management Systems",
      "Controllers",
    ],
  },
  {
    n: "07",
    name: "KALA Industries",
    img: "/images/ver-industries.jpg",
    items: ["Military Bridges", "Cranes", "Engineering Systems"],
  },
  {
    n: "08",
    name: "KALA Quantum AI",
    img: "/images/control-panel.jpg",
    items: ["KALA Careers", "KALA Horizon", "KALA Recall", "KALA Vaani", "KALA Kavach", "KALA Nexora"],
  },
];

export default function Verticals() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const scrollDist = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDist + window.innerHeight * 0.5}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="verticals" ref={sectionRef} className="relative bg-white">
      {/* desktop: horizontal pinned track */}
      <div className="hidden h-screen items-center overflow-hidden md:flex">
        <div ref={trackRef} className="flex items-center gap-7 px-[8vw] will-change-transform">
          {/* intro panel */}
          <div className="w-[80vw] flex-none sm:w-[34vw]">
            <SectionLabel index="08">Our Verticals</SectionLabel>
            <h2 className="mt-5 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-ink">
              Eight ways we<br /><span className="text-gradient">build the future.</span>
            </h2>
            <p className="mt-5 max-w-sm text-lg text-gray-soft">
              Scroll to move horizontally through every KALA vertical — each an
              immersive panel of capability and impact.
            </p>
            <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-blue">
              Scroll
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {VERTICALS.map((v) => (
            <Panel key={v.n} {...v} />
          ))}
        </div>
      </div>

      {/* mobile: stacked */}
      <div className="px-6 py-20 md:hidden">
        <SectionLabel index="08">Our Verticals</SectionLabel>
        <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.04] tracking-tight text-ink">
          Eight ways we <span className="text-gradient">build the future.</span>
        </h2>
        <div className="mt-8 space-y-4">
          {VERTICALS.map((v) => (
            <Panel key={v.n} {...v} mobile />
          ))}
        </div>
      </div>
    </section>
  );
}

function Panel({ n, name, items, img, mobile = false }) {
  return (
    <div
      className={`group relative flex flex-none flex-col justify-end overflow-hidden rounded-3xl border border-gray-line shadow-soft transition-colors hover:border-blue/30 ${
        mobile ? "min-h-[420px] w-full" : "h-[66vh] w-[80vw] sm:w-[32vw]"
      }`}
    >
      {/* image */}
      <Image
        src={img}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 32vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

      <div className="relative z-10 flex items-center justify-between p-6 pb-0">
        <span className="font-mono text-xs text-white/60">{n}</span>
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue to-cyan" />
      </div>
      <div className="relative z-10 mt-auto p-6">
        <h3 className="font-display text-3xl font-extrabold tracking-tight text-white">{name}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
