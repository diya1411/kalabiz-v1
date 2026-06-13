"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
  onClick,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.35, y: y * 0.35 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-ink text-white hover:bg-blue"
      : "border border-gray-line bg-white/70 text-ink hover:border-blue/40";

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  );
}
