"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const PATENTS = [
  { img: "/images/certs/patent-ca-storage.jpg", title: "Controlled Atmosphere Storage", sub: "Patent · IP India" },
  { img: "/images/certs/patent-loading.jpg", title: "Loading & Sorting System", sub: "Patent · IP India" },
  { img: "/images/certs/patent-bridging.jpg", title: "Granted Patent", sub: "Patent Office, Govt. of India" },
  { img: "/images/certs/patent-genset.jpg", title: "Granted Patent", sub: "Patent Office, Govt. of India" },
];

const CERTS = [
  { img: "/images/certs/iso9001-genset.jpg", title: "ISO 9001:2015", sub: "Kala Genset · SGS" },
  { img: "/images/certs/iso14001-genset.jpg", title: "ISO 14001:2015", sub: "Kala Genset · SGS" },
  { img: "/images/certs/iso45001-genset.jpg", title: "ISO 45001:2018", sub: "Kala Genset · SGS" },
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

export default function Patents() {
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

        {/* patents */}
        <h3 className="mt-14 font-display text-sm font-bold uppercase tracking-[0.2em] text-gray-soft">
          Patents
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PATENTS.map((c, i) => (
            <CertCard key={c.title + i} {...c} index={i} badge="Patented" />
          ))}
        </div>

        {/* certifications */}
        <h3 className="mt-12 font-display text-sm font-bold uppercase tracking-[0.2em] text-gray-soft">
          Certifications & Approvals
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {CERTS.map((c, i) => (
            <CertCard key={c.title + i} {...c} index={i} />
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
    </section>
  );
}

function CertCard({ img, title, sub, index, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group overflow-hidden rounded-2xl border border-gray-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-glow"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-offwhite">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width:768px) 45vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
    </motion.div>
  );
}
