"use client";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EditorialTitle } from "../ui/editorial-title";
import { EditorialImage } from "../ui/editorial-image";
import { EditorialText } from "../ui/editorial-text";
import { useLanguage } from "@/contexts/language-context";

export function HeroSection() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lenis) {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
    return () => {
      lenis?.start();
    };
  }, [lenis]);

  useGSAP(() => {
    gsap.fromTo(".gsap-hero-btn",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        delay: 3.6,
        ease: "back.out(1.7)"
      }
    );
  }, { scope: sectionRef });

  const handleStartJourney = () => {
    if (!lenis) return;

    lenis.start();

    lenis.scrollTo("#fittipaldi-section", {
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  };

  return (
    <section ref={sectionRef} className="w-full h-dvh overflow-hidden flex flex-col justify-center relative pt-[11dvh] pb-20 md:pb-16">
      <div className="flex flex-col md:grid md:grid-cols-12 items-start w-full h-full">
        <div className="md:col-start-1 md:col-end-11 md:row-start-1 z-10 flex flex-col md:justify-between h-auto md:h-full pointer-events-none shrink-0">

          <div className="mix-blend-multiply">
            <EditorialTitle
              topWord={t('hero.titleTop')}
              middleWord={t('hero.titleMiddle')}
              bottomWord={t('hero.titleBottom')}
            />
          </div>

          <div className="mt-4 md:mt-0 max-w-[95%] sm:max-w-65 lg:max-w-85 md:mb-4 lg:mb-8 pointer-events-auto flex flex-col items-start gap-8">
            <EditorialText
              content={t('hero.description')}
              delay={3.2}
            />
            <button
              onClick={handleStartJourney}
              className="gsap-hero-btn pointer-events-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-xs md:text-sm uppercase tracking-[0.2em] border border-zinc-800 shadow-xl cursor-pointer hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300 hover:scale-105 active:scale-98 transition-all duration-500 flex items-center gap-4 group relative overflow-hidden will-change-transform"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>

              {t('ui.startBtn')}

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform duration-500 ease-out group-hover:translate-y-1.5"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="md:col-start-5 md:col-end-13 md:row-start-1 z-0 w-full flex-1 min-h-0 flex items-end mt-2 md:mt-auto">
          <EditorialImage src="/hero-image-retocada-color-semfundo.png" alt="Lendas do Automobilismo" />
        </div>
      </div>
    </section>
  );
}