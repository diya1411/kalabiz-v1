"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const PATENTS = [
  { img: "/images/certs/patent-ca-storage.jpg", title: "Controlled Atmosphere Storage", sub: "Patent · IP India" },
  { img: "/images/certs/patent-loading.jpg", title: "Loading & Sorting System", sub: "Patent · IP India" },
  { img: "/images/certs/patent-bridging.jpg", title: "Granted Patent", sub: "Patent Office, Govt. of India" },
  { img: "/images/certs/patent-genset.jpg", title: "Granted Patent", sub: "Patent Office, Govt. of India" },
];

const CERTS = [
  { img: "/images/certs/iso9001-genset.jpg", title: "ISO 9001:2015", sub: "KALA Genset · SGS" },
  { img: "/images/certs/iso14001-genset.jpg", title: "ISO 14001:2015", sub: "KALA Genset · SGS" },
  { img: "/images/certs/iso45001-genset.jpg", title: "ISO 45001:2018", sub: "KALA Genset · SGS" },
  { img: "/images/certs/iso9001-defence.jpg", title: "ISO 9001:2015", sub: "Defence & Aerospace · SGS" },
  { img: "/images/certs/ncs-tcp.jpg", title: "NCS-TCP Recognition", sub: "Dept. of Biotechnology" },
  { img: "/images/certs/cpri-test.jpg", title: "CPRI Test Report", sub: "Central Power Research Inst." },
  { img: "/images/certs/samar-defence.jpg", title: "SAMAR Certificate", sub: "Advanced Manufacturing" },
  { img: "/images/certs/dgqa-mod.jpg", title: "DGQA Registration", sub: "Ministry of Defence" },
];

const ACHIEVEMENTS = [
  "India's first DG set for −40 °C operation",
  "First Indian DG set running at both 50 Hz & 60 Hz",
  "Trial-tested at 5,500 m altitude",
  "165+ DG sets supplied to the Indian Armed Forces",
];

// combined pool that feeds the live grid — add new items to PATENTS / CERTS above
const POOL = [
  ...PATENTS.map((p) => ({ ...p, badge: "Patent" })),
  ...CERTS.map((c) => ({ ...c })),
];
const GRID_SIZE = Math.min(8, POOL.length);

export default function Patents() {
  const [slots, setSlots] = useState(() => POOL.slice(0, GRID_SIZE).map((_, i) => i));
  const [open, setOpen] = useState(false);
  const nextRef = useRef(GRID_SIZE % POOL.length);
  const slotRef = useRef(0);

  // live "changing" grid — swap one tile at a time for fresh ones not currently shown
  useEffect(() => {
    if (POOL.length <= GRID_SIZE) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setSlots((prev) => {
        const shown = new Set(prev);
        let n = nextRef.current % POOL.length;
        let tries = 0;
        while (shown.has(n) && tries < POOL.length) {
          n = (n + 1) % POOL.length;
          tries++;
        }
        nextRef.current = (n + 1) % POOL.length;
        const slot = slotRef.current % GRID_SIZE;
        slotRef.current += 1;
        const copy = [...prev];
        copy[slot] = n;
        return copy;
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // lock scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="accreditations" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <SectionLabel index="05">Accreditations</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl">
            <TextReveal text="Engineered to the" />{" "}
            <TextReveal text="highest standards." className="text-gradient" />
          </h2>
          <p className="mt-5 max-w-lg text-lg text-gray-soft">
            Proprietary, patented technologies — validated by the country's most
            rigorous quality, defence and environmental accreditations.
          </p>
        </div>

        {/* live changing grid */}
        <div className="mt-12 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-gray-soft">
            Patents & Certifications
          </h3>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-gray-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-blue/40 hover:bg-mist"
          >
            View all
            <span className="text-gray-soft">({PATENTS.length + CERTS.length})</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {slots.map((poolIdx, i) => (
            <RotatingCard key={i} item={POOL[poolIdx]} />
          ))}
        </div>

        {/* achievements strip */}
        <div className="mt-12 rounded-3xl border border-gray-line bg-ink p-7 text-white md:p-9">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex gap-3"
              >
                <span className="font-display text-lg font-extrabold text-cyan-soft">0{i + 1}</span>
                <p className="text-sm leading-snug text-white/80">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* view-all modal */}
      <AnimatePresence>
        {open && <AllModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}

function RotatingCard({ item }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-line bg-offwhite shadow-soft">
      <AnimatePresence>
        <motion.div
          key={item.img}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image src={item.img} alt={item.title} fill sizes="(max-width:768px) 45vw, 22vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
          {item.badge && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-blue px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              {item.badge}
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 p-3.5">
            <p className="truncate font-display text-sm font-bold text-white">{item.title}</p>
            <p className="truncate text-[11px] text-white/70">{item.sub}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AllModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl sm:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-blue">Accreditations</p>
            <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Patents & Certifications
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gray-line text-ink transition-colors hover:bg-mist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <h4 className="mt-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-gray-soft">Patents</h4>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {PATENTS.map((c, i) => (
            <FullCard key={c.title + i} {...c} badge="Patent" />
          ))}
        </div>

        <h4 className="mt-9 font-display text-sm font-bold uppercase tracking-[0.2em] text-gray-soft">
          Certifications & Approvals
        </h4>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CERTS.map((c, i) => (
            <FullCard key={c.title + i} {...c} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FullCard({ img, title, sub, badge }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-glow">
      <div className="relative aspect-[3/4] overflow-hidden bg-offwhite">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width:768px) 45vw, 22vw"
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-blue px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="border-t border-gray-line p-3.5">
        <p className="truncate font-display text-sm font-bold text-ink">{title}</p>
        <p className="truncate text-[11px] text-gray-soft">{sub}</p>
      </div>
    </div>
  );
}
