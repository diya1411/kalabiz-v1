"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

export default function Connect() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="connect" className="relative overflow-hidden bg-white pt-24">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute inset-x-0 top-0 h-80"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(31,109,255,0.10), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="14" className="justify-center">Connect With Us</SectionLabel>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-ink md:text-6xl">
            <TextReveal text="Let's engineer" />
            <br />
            <TextReveal text="what's next." className="text-gradient" />
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-gray-line bg-offwhite p-7 shadow-soft md:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Company" name="company" placeholder="Organisation" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
              <Field label="Phone" name="phone" placeholder="+91" />
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-soft">
                Area of Interest
              </label>
              <select className="w-full rounded-xl border border-gray-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue">
                <option>Energy & Power Solutions</option>
                <option>Defence & Aerospace</option>
                <option>Eco Green Energy</option>
                <option>Biotech & Food Storage</option>
                <option>KALA Quantum AI</option>
                <option>Partnership / Investment</option>
              </select>
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-soft">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your requirement…"
                className="w-full resize-none rounded-xl border border-gray-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue sm:w-auto"
            >
              {sent ? "Thank you — we'll be in touch" : "Send Message"}
              {!sent && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </motion.form>

          {/* contact details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl border border-gray-line bg-white p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-ink">Corporate Office</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                KALA Group, Corporate &amp; R&amp;D Centre,<br />
                Pune, Maharashtra, India
              </p>
              <div className="mt-4 space-y-2 text-sm">
                <a href="mailto:info@kalabiz.com" className="flex items-center gap-2.5 text-ink/80 hover:text-blue">
                  <IconMail /> info@kalabiz.com
                </a>
                <a href="tel:18001230018" className="flex items-center gap-2.5 text-ink/80 hover:text-blue">
                  <IconPhone /> 1800 123 0018
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-line bg-white p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-ink">International Presence</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                Serving clients across <span className="font-semibold text-ink">10+ countries</span> — including Oman, Kenya and Uganda.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-soft">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-line bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-blue"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="mx-auto max-w-3xl text-center font-display text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Engineering a Sustainable Tomorrow.<br />
          <span className="text-cyan-soft">Innovating Beyond Borders.</span>
        </p>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-cyan">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M4 4v16M4 12l9-8M4 12l9 8" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display text-lg font-extrabold">KALA GROUP</span>
          </div>

          <div className="flex items-center gap-3">
            {["LinkedIn", "X", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-cyan/50 hover:text-white"
              >
                {s}
              </a>
            ))}
          </div>

          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} KALA Group. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue">
      <path d="M5 4h4l2 5-3 2a14 14 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
