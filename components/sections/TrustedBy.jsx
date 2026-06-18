"use client";

// Defence, space & institutional partners
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
  "Airports Authority of India",
  "Power Grid Corporation of India",
  "GAIL (India)",
  "IIT Bombay",
  "Adani",
  "Kirloskar",
  "NAFED",
];

// Recognized corporate & enterprise clients (curated from the customer base)
const CLIENTS = [
  "Tata Power",
  "Tata Projects",
  "Tata Technologies",
  "Tata Teleservices",
  "Tata Autocomp Systems",
  "JSW Steel",
  "MRF",
  "SRF",
  "Abbott India",
  "Aditya Birla Health Services",
  "DMart (Avenue Supermarts)",
  "State Bank of India",
  "ICICI Bank",
  "Axis Bank",
  "HDFC Bank",
  "Bank of Maharashtra",
  "Saraswat Co-operative Bank",
  "Bajaj Electricals",
  "Surya Roshni",
  "Prism Johnson",
  "Kalpataru Projects International",
  "Kirloskar Oil Engines",
  "Kirloskar Ferrous Industries",
  "Megha Engineering & Infrastructures",
  "Dilip Buildcon",
  "Kolte-Patil",
  "Sobha Limited",
  "Provident Housing",
  "DHL Supply Chain",
  "Schenker India",
  "Iron Mountain India",
  "CIE Automotive India",
  "Hyundai Transys India",
  "Gestamp Pune Automotive",
  "Syrma SGS Technology",
  "Jubilant FoodWorks",
  "Rebel Foods",
  "Zepto",
  "Hatsun Agro",
  "Olam Agri",
  "Sava Healthcare",
  "Metropolis Healthcare",
  "Thyrocare Technologies",
  "HiMedia Laboratories",
  "Aquapharm Chemicals",
  "Valmet Technologies",
  "Kelvion India",
  "P. N. Gadgil Jewellers",
  "Cupid Limited",
  "ISMT Limited",
  "BVG India",
];

// mix partners + clients, then split into two even rows
const ALL = (() => {
  const out = [];
  const max = Math.max(PARTNERS.length, CLIENTS.length);
  for (let i = 0; i < max; i++) {
    if (CLIENTS[i]) out.push(CLIENTS[i]);
    if (PARTNERS[i]) out.push(PARTNERS[i]);
  }
  return out;
})();
const ROW_1 = ALL.filter((_, i) => i % 2 === 0);
const ROW_2 = ALL.filter((_, i) => i % 2 === 1);

export default function TrustedBy() {
  return (
    <section className="relative overflow-hidden border-y border-gray-line bg-offwhite py-12 md:py-14">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gray-soft">
        Trusted by 800+ clients across India
      </p>

      {/* both lists mixed, both rows same direction & speed */}
      <Row items={ROW_1} speed="60s" />
      <Row items={ROW_2} speed="60s" />
    </section>
  );
}

function Row({ items, speed, reverse = false }) {
  return (
    <div className="marquee-track group relative mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
      <div
        className={`marquee-x flex shrink-0 items-center gap-3 pr-3 ${reverse ? "reverse" : ""}`}
        style={{ "--speed": speed }}
      >
        {[...items, ...items].map((p, i) => (
          <Pill key={i} name={p} />
        ))}
      </div>
    </div>
  );
}

function Pill({ name }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-gray-line bg-white px-6 py-2.5 text-sm font-medium text-ink shadow-soft transition-colors hover:border-blue/30 hover:text-blue">
      {name}
    </span>
  );
}
