"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";

/* Order and sub-domains exactly as per the KALA Verticals sheet */
const VERTICALS = [
  {
    n: "01",
    name: "Genset",
    imgs: [
      "/images/products/r-genset-25kva.png",
      "/images/products/r-genset-320kva.png",
      "/images/products/r-genset-1000kva.png",
      "/images/products/r-optiprime.png",
      "/images/products/r-genset-portable.png",
    ],
    contain: true,
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
    imgs: [
      "/images/ver-defence.jpg",
      "/images/ground-systems.jpg",
      "/images/bridges.jpg",
      "/images/plant-defence.jpg",
    ],
    items: ["Ground Systems", "Engineering Systems", "Advanced Power Management"],
  },
  {
    n: "03",
    name: "Biotech",
    imgs: [
      "/images/biotech-storage.jpg",
      "/images/gallery/cold-storage.jpg",
      "/images/plant-freeze.jpg",
    ],
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
    imgs: ["/images/eco-electrolyser.jpg", "/images/gallery/deployment.jpg"],
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
    imgs: ["/images/care-service-1.jpg", "/images/care-service-2.jpg"],
    items: [
      "Product Support (AMC, Spares & RECD)",
      "Reconditioning & Repowering",
      "Power Rental",
    ],
  },
  {
    n: "06",
    name: "Power Electronics",
    imgs: ["/images/control-panel.jpg", "/images/ver-power.jpg"],
    items: [
      "Advanced Power Management",
      "Energy Management Systems",
      "Controllers",
    ],
  },
  {
    n: "07",
    name: "KALA Industries",
    imgs: ["/images/ver-industries.jpg"],
    items: ["Military Bridges", "Cranes", "Engineering Systems"],
  },
  {
    n: "08",
    name: "KALA Quantum AI",
    imgs: ["/images/kqa-logo.png", "/images/ver-ai.jpg"],
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

function Slideshow({ imgs, alt, contain = false }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (imgs.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % imgs.length), 3800);
    return () => clearInterval(id);
  }, [imgs.length]);

  return (
    <>
      {contain && <div className="absolute inset-0 bg-gradient-to-br from-navy via-ink to-black" />}
      {imgs.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 32vw"
          className={`transition-[opacity,transform] duration-1000 group-hover:scale-105 ${
            contain ? "object-contain object-top p-6 pt-10" : "object-cover"
          } ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </>
  );
}

function Panel({ n, name, items, imgs, contain = false, mobile = false }) {
  return (
    <div
      className={`group relative flex flex-none flex-col justify-end overflow-hidden rounded-3xl border border-gray-line shadow-soft transition-colors hover:border-blue/30 ${
        mobile ? "min-h-[420px] w-full" : "h-[66vh] w-[80vw] sm:w-[32vw]"
      }`}
    >
      {/* image slideshow */}
      <Slideshow imgs={imgs} alt={name} contain={contain} />
      {/* gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />

      <div className="relative z-10 flex items-center justify-between p-6 pb-0">
        <span className="font-mono text-xs text-white/60">{n}</span>
        {imgs.length > 1 ? (
          <div className="flex gap-1.5">
            {imgs.map((src) => (
              <span key={src} className="h-1.5 w-1.5 rounded-full bg-white/40" />
            ))}
          </div>
        ) : (
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-blue to-cyan" />
        )}
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
