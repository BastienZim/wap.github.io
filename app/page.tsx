import Hero from "@/components/hero";
import CTA from "@/components/cta-banner";
import Schedule from "@/components/schedule";
import Tarifs from "@/components/tarifs";
import WaDoRyu from "@/components/WadoRyu";
import LieuxHoraires from "@/components/LieuxHoraires";

export default function Home() {
  return (
    <main className="min-h-screen w-full" style={{ backgroundColor: 'rgb(var(--color-background))' }}>
 
      <Hero />

      <WaDoRyu />
      <Schedule />
      <Tarifs />
      <LieuxHoraires />
      
      
      
      

      <CTA />
    </main>
  );
}
