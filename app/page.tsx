import Hero from "@/components/hero";
import CTA from "@/components/cta-banner";
import Link from "next/link";
import Schedule from "@/components/schedule";
import Tarifs from "@/components/tarifs";
import WaDoRyu from "@/components/WadoRyu";
import LieuxHoraires from "@/components/LieuxHoraires";

export default function Home() {
  return (
    <>
      <Hero />

      <WaDoRyu />
      <Schedule />
      <Tarifs />
      <LieuxHoraires />
      
      
      
      

      <CTA />
    </>
  );
}
