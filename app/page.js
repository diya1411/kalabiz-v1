import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Ecosystem from "@/components/sections/Ecosystem";
import Welcome from "@/components/sections/Welcome";
import VisionMission from "@/components/sections/VisionMission";
import Pillars from "@/components/sections/Pillars";
import Verticals from "@/components/sections/Verticals";
import Facilities from "@/components/sections/Facilities";
import Patents from "@/components/sections/Patents";
import CoreValues from "@/components/sections/CoreValues";
import Journey from "@/components/sections/Journey";
import GlobalPresence from "@/components/sections/GlobalPresence";
import Events from "@/components/sections/Events";
import Board from "@/components/sections/Board";
import Connect from "@/components/sections/Connect";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <TrustedBy />
      <Welcome />
      <VisionMission />
      <Pillars />
      <CoreValues />
      <Patents />
      <Ecosystem />
      <Verticals />
      <Journey />
      <Facilities />
      <GlobalPresence />
      <Events />
      <Board />
      <Connect />
    </main>
  );
}
