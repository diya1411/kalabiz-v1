"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/Reveal";

const SOCIALS = [
  { name: "LinkedIn", handle: "KALA Group", url: "https://www.linkedin.com/company/kala-group" },
  { name: "Instagram", handle: "@kalagroup", url: "https://www.instagram.com/kalagroup" },
  { name: "YouTube", handle: "KALA Group", url: "https://www.youtube.com/@kalagroup" },
  { name: "X", handle: "@kalagroup", url: "https://x.com/kalagroup" },
];

function SocialIcon({ name }) {
  const p = {
    LinkedIn: "M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.64-.03-3.75-2.3-3.75-2.3 0-2.65 1.8-2.65 3.63V24h-4Z",
    Instagram: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.05A6.75 6.75 0 1 0 18.75 12 6.75 6.75 0 0 0 12 5.25Zm0 11.13A4.38 4.38 0 1 1 16.38 12 4.38 4.38 0 0 1 12 16.38Zm6.95-11.4a1.58 1.58 0 1 1-1.57-1.58 1.58 1.58 0 0 1 1.57 1.58Z",
    YouTube: "M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6Z",
    X: "M18.9 1.5h3.3l-7.2 8.2L23.7 22.5h-6.6l-5.2-6.8-6 6.8H2.6l7.7-8.8L1.9 1.5h6.8l4.7 6.2ZM17.7 20.5h1.8L7.1 3.4H5.1Z",
  }[name];
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={p} />
    </svg>
  );
}

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
          <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.04] tracking-tight text-ink md:text-6xl">
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
                Serving clients across <span className="font-semibold text-ink">20+ countries</span> — including Oman, Kenya and Uganda.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-line bg-white p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-ink">Follow Us</h3>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-line px-3.5 py-2 text-sm font-medium text-ink/80 transition-colors hover:border-blue/40 hover:bg-mist hover:text-blue"
                  >
                    <SocialIcon name={s.name} />
                    {s.handle}
                  </a>
                ))}
              </div>
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
