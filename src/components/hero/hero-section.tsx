"use client";
import { EditorialTitle } from "../ui/editorial-title";
import { EditorialImage } from "../ui/editorial-image";
import { EditorialText } from "../ui/editorial-text";
import { ScrollIndicator } from "./scroll-indicator";
import { useLanguage } from "@/contexts/language-context";

export function HeroSection() {
  const { language } = useLanguage();
  const titles = {
    PT: { top: "Lendas", middle: "das", bottom: "Pistas" },
    EN: { top: "Legends", middle: "of the", bottom: "Track" }
  }

  const descriptions = {
    PT: "Oito títulos mundiais e um país inteiro acelerando junto. O asfalto guarda a técnica, a bravura e a história de ícones que transcenderam o esporte e transformaram as manhãs de domingo na era de ouro do nosso automobilismo.",
    EN: "Eight world titles and an entire country accelerating together. The asphalt holds the technique, bravery, and history of icons who transcended the sport and transformed Sunday mornings into the golden era of our motorsport."
  }

  return (
    <section className="w-full h-dvh overflow-hidden flex flex-col justify-center relative pt-[11dvh] pb-20 md:pb-16">
      <div className="flex flex-col md:grid md:grid-cols-12 items-start w-full h-full">
        <div className="md:col-start-1 md:col-end-11 md:row-start-1 z-10 flex flex-col md:justify-between h-auto md:h-full pointer-events-none shrink-0">
          
          <div className="mix-blend-multiply">
            <EditorialTitle
              topWord={titles[language].top}
              middleWord={titles[language].middle}
              bottomWord={titles[language].bottom}
            />
          </div>

          <div className="mt-4 md:mt-0 max-w-[95%] sm:max-w-65 lg:max-w-85 md:mb-4 lg:mb-8 pointer-events-auto">
            <EditorialText
              content={descriptions[language]}
              delay={3.2}
            />
          </div>
        </div>
        <div className="md:col-start-5 md:col-end-13 md:row-start-1 z-0 w-full flex-1 min-h-0 flex items-end mt-2 md:mt-auto">
          <EditorialImage src="/hero-image-retocada-color-semfundo.png" alt="Lendas do Automobilismo" />
        </div>

      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30">
        <ScrollIndicator />
      </div>
    </section>
  );
}