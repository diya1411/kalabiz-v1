"use client";

import { motion } from "framer-motion";

export default function SectionLabel({ index, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue ${className}`}
    >
      <span className="inline-flex h-6 items-center rounded-full border border-blue/25 bg-blue/5 px-2.5 font-mono text-[10px] text-blue">
        {index}
      </span>
      <span className="text-gray-soft">{children}</span>
    </motion.div>
  );
}
