import Hero from "@/components/hero";
import CTA from "@/components/cta-banner";
import Schedule from "@/components/schedule";
import Tarifs from "@/components/tarifs";
import WaDoRyu from "@/components/WadoRyu";
import LieuxHoraires from "@/components/LieuxHoraires";

export default function Home() {
  return (
    <main className="bg-primary-100 min-h-screen w-full">
 
      <Hero />

      <WaDoRyu />
      <Schedule />
      <Tarifs />
      <LieuxHoraires />
      
      
      
      

      <CTA />
    </main>
  );
}
