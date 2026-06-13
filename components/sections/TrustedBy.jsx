"use client";

const PARTNERS = [
  "Indian Army",
  "Indian Navy",
  "Indian Air Force",
  "DRDO",
  "ISRO",
  "BEL",
  "Bharat Dynamics",
  "BEML",
  "TATA Advanced Systems",
  "Adani",
  "Kirloskar",
  "NAFED",
];

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden border-y border-gray-line bg-offwhite py-12 md:py-14">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gray-soft">
        Trusted by India&apos;s defence, space &amp; industrial leaders
      </p>

      <div className="marquee-track group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <div className="marquee-x flex shrink-0 items-center gap-3 pr-3">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <Pill key={i} name={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pill({ name }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-gray-line bg-white px-6 py-2.5 text-sm font-medium text-ink shadow-soft transition-colors hover:border-blue/30 hover:text-blue">
      {name}
    </span>
  );
}
