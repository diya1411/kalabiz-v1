import { Inter, Bricolage_Grotesque, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Display typeface (card titles, stats, UI)
const jakarta = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Editorial serif for main headings (used un-bolded)
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Brand wordmark typeface (KALA logo lockup)
const futura = localFont({
  src: "./fonts/Futura-Bold.otf",
  variable: "--font-futura",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://kalabiz.com"),
  title: "KALA Group — Engineering India's Future",
  description:
    "KALA Group is one of India's most innovative engineering conglomerates — building Energy Security, Defence Self-Reliance and Food Security through indigenous engineering, advanced R&D and AI-driven systems.",
  keywords: [
    "KALA Group",
    "engineering conglomerate India",
    "Genset",
    "Defence & Aerospace",
    "Eco Green Energy",
    "Biotech",
    "AI/ML",
    "Make in India",
  ],
  openGraph: {
    title: "KALA Group — Engineering India's Future",
    description:
      "Energy Security · Defence Self-Reliance · Food Security · AI-Driven Innovation · Advanced Manufacturing.",
    type: "website",
    siteName: "KALA Group",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${playfair.variable} ${futura.variable}`}>
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
