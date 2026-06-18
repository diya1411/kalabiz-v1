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
      <span className="h-px w-6 bg-blue/40" />
      <span className="text-gray-soft">{children}</span>
    </motion.div>
  );
}
