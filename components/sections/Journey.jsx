"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";

const MILESTONES = [
  { year: "1991", name: "KALA Enterprises", tag: "The founding" },
  { year: "1994", name: "KALA Genset", tag: "Power systems" },
  { year: "1999", name: "CHANDRA Infotech", tag: "Technology" },
  { year: "2004", name: "KALA Telecom", tag: "Connectivity" },
  { year: "2007", name: "KALA Kenya", tag: "Going global" },
  { year: "2008", name: "KALA Uganda", tag: "Africa expansion" },
  { year: "2009", name: "KALA Biotech", tag: "Agri food" },
  { year: "2012", name: "KALA Infra", tag: "Infrastructure" },
  { year: "2014", name: "KALA Oman LLC", tag: "Middle East" },
  { year: "2018", name: "Freeze n Cold Technologies", tag: "Cold chain" },
  { year: "2019", name: "KALA Span Defence", tag: "Defence entry" },
  { year: "2020", name: "Environmental Solutions", tag: "Sustainability" },
  { year: "2022", name: "Defence & Aerospace", tag: "Mission-critical" },
  { year: "2024", name: "Eco Green Energy", tag: "Hydrogen era" },
  { year: "2024", name: "Care Global", tag: "Lifecycle care" },
  { year: "2026", name: "Power Electronics", tag: "Next frontier" },
  { year: "2026", name: "KALA Quantum AI", tag: "SaaS & digital platforms" },
  { year: "2026", name: "KALA Industries", tag: "Cranes & engineering systems" },
];

export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);

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
      // progress fill on the spine
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDist + window.innerHeight * 0.5}`,
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative bg-white">
      {/* desktop: horizontal pinned flow */}
      <div className="relative hidden h-screen flex-col justify-center overflow-hidden md:flex">
        <div className="absolute left-[8vw] top-[18%]">
          <SectionLabel index="08">Our Journey</SectionLabel>
          <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-ink">
            From 1991 to <span className="text-gradient">the future.</span>
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue">
            Scroll
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </p>
        </div>

        <div ref={trackRef} className="relative flex items-center will-change-transform" style={{ paddingLeft: "8vw", paddingRight: "12vw" }}>
          {/* the flowing spine */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-line" />
          <div
            ref={lineRef}
            className="absolute left-0 right-0 top-1/2 h-0.5 origin-left -translate-y-1/2 bg-gradient-to-r from-navy via-blue to-cyan"
          />

          {MILESTONES.map((m, i) => (
            <HNode key={i} {...m} index={i} above={i % 2 === 0} />
          ))}
        </div>
      </div>

      {/* mobile: vertical flow */}
      <div className="px-6 py-20 md:hidden">
        <SectionLabel index="08">Our Journey</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink">
          From 1991 to <span className="text-gradient">the future.</span>
        </h2>
        <div className="relative mt-10 pl-8">
          <div className="absolute bottom-2 left-1.5 top-2 w-0.5 bg-gradient-to-b from-navy via-blue to-cyan" />
          <div className="space-y-6">
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[26px] top-2 h-3 w-3 rounded-full border-2 border-white bg-blue shadow-[0_0_0_3px_rgba(31,109,255,0.15)]" />
                <Card {...m} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HNode({ year, name, tag, above }) {
  return (
    <div className="relative flex w-[230px] flex-none flex-col items-center">
      {/* connector node */}
      <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span className="block h-4 w-4 rounded-full border-2 border-white bg-blue shadow-[0_0_0_4px_rgba(31,109,255,0.12)]" />
      </span>
      {/* vertical stalk */}
      <span
        className={`absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gray-line ${
          above ? "bottom-1/2" : "top-1/2"
        }`}
      />

      <div className={`w-full ${above ? "mb-auto pb-24" : "mt-auto pt-24"}`}>
        <Card year={year} name={name} tag={tag} />
      </div>
    </div>
  );
}

function Card({ year, name, tag }) {
  return (
    <div className="group rounded-2xl border border-gray-line bg-offwhite p-5 transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-soft">
      <span className="font-display text-2xl font-extrabold tracking-tight text-gradient">{year}</span>
      <h3 className="mt-1.5 font-display text-base font-bold leading-tight text-ink">{name}</h3>
      <p className="mt-0.5 text-sm text-gray-soft">{tag}</p>
    </div>
  );
}
