"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { api } from "@/lib/api";
import { AudioPlayer } from "../audio/audio-player";
import { TimelineTrack } from "../ui/timeline-track";
import { TimelineCard } from "../ui/timeline-card";
import { ASSETS } from "@/constants/media";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FittipaldiSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const [wins, setWins] = useState<string>("-");
  const [titles, setTitles] = useState<string>("-");
  const [isSectionActive, setIsSectionActive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const winsRes = await api.get('drivers/emerson_fittipaldi/results/1.json?limit=1');
        if (isMounted) {
          setWins(winsRes.data.MRData.total);
          setTitles("2");
        }
      } catch (e) {
        if (isMounted) {
          setWins("14");
          setTitles("2");
        }
      }
    }

    fetchStats();

    return () => { isMounted = false; };
  }, []);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      end: "bottom 30%",
      onToggle: (self) => setIsSectionActive(self.isActive)
    });

    const cards = gsap.utils.toArray(".timeline-card");
    cards.forEach((card: any) => {

      ScrollTrigger.create({
        trigger: card,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          const dot = card.querySelector('.card-dot');
          const content = card.querySelector('.card-content');
          const image = card.querySelector('.card-image');

          if (dot) gsap.to(dot, { scale: self.isActive ? 1.6 : 1, duration: 0.3, ease: "back.out(2)" });
          if (content) gsap.to(content, { scale: self.isActive ? 1.03 : 1, borderColor: self.isActive ? 'rgba(34,197,94,0.4)' : 'rgba(228,228,231,1)', duration: 0.3 });
          if (image) gsap.to(image, { filter: self.isActive ? 'grayscale(0%)' : 'grayscale(100%)', duration: 0.5, ease: "power2.out" });
        }
      });

      const elementsToReveal = card.querySelectorAll('.card-reveal');
      if (elementsToReveal.length > 0) {
        gsap.from(elementsToReveal, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out"
        });
      } else {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 60, opacity: 0, duration: 1, ease: "power3.out"
        });
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="fittipaldi-section" ref={sectionRef} className="relative w-full bg-[#f2f2f2] text-zinc-900 py-32 overflow-hidden">
      <AudioPlayer
        audioSrc={ASSETS.AUDIO.FITTIPALDI}
        trackTitle="Lotus 72D"
        trackArtist="Zé Roberto"
        isActive={isSectionActive}
        accentClass="accent-green-500"
        textAccentClass="text-green-600"
      />
      <div className="relative z-10 max-w-350 mx-auto px-6 pt-20">
        <TimelineTrack />
        <div className="relative flex w-full justify-between items-center pl-16 md:pl-0 timeline-card md:mb-40 mb-24">
          <div className="card-reveal hidden md:block absolute left-[calc(50%-10px)] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#f2f2f2] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10 card-dot" />
          <div className="card-reveal hidden md:block w-[45%] h-100 lg:h-125 relative rounded-3xl overflow-hidden shadow-2xl card-image md:order-1" style={{ filter: 'grayscale(100%)' }}>
            <Image
              src={ASSETS.FITTIPALDI.PROFILE}
              alt="Emerson Fittipaldi Perfil"
              fill
              sizes="(max-width: 1024px) 50vw, 1000px"
              priority={true}
              className="object-cover object-top transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="w-full md:w-[45%] bg-white/60 backdrop-blur-xl p-8 lg:p-12 rounded-3xl border border-zinc-200 group card-content md:order-2 flex flex-col justify-center">
            <span className="card-reveal inline-block text-zinc-900 text-[10px] font-bold tracking-widest uppercase mb-4">O Pioneiro</span>

            <h2 className="card-reveal text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500 leading-[0.9] drop-shadow-sm">
              EMERSON<br />FITTIPALDI
            </h2>

            <p className="card-reveal text-zinc-500 mt-4 font-cursive text-3xl lg:text-4xl">"{t('fittipaldi.nickname')}"</p>

            <div className="card-reveal flex gap-4 lg:gap-6 mt-10 w-full">
              <div className="flex-1 bg-white/80 backdrop-blur-md px-2 py-4 lg:py-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center transition-colors hover:border-green-400/50">
                <span className="block text-4xl lg:text-5xl font-bold text-zinc-900">{titles}</span>
                <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-500 mt-1 text-center">Títulos Mundiais</span>
              </div>
              <div className="flex-1 bg-white/80 backdrop-blur-md px-2 py-4 lg:py-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col items-center justify-center transition-colors hover:border-green-400/50">
                <span className="block text-4xl lg:text-5xl font-bold text-zinc-900">{wins}</span>
                <span className="text-[9px] lg:text-[10px] uppercase tracking-widest text-zinc-500 mt-1 text-center">Vitórias (F1)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-32 pb-32">
          <TimelineCard alignment="left" variant="zinc" period={t('fittipaldi.preF1.period')} title={t('fittipaldi.preF1.title')} text={t('fittipaldi.preF1.text')} imageSrc={ASSETS.FITTIPALDI.PRE_F1} priority={true} />
          <TimelineCard alignment="right" variant="yellow" period={t('fittipaldi.lotus72.period')} title={t('fittipaldi.lotus72.title')} text={t('fittipaldi.lotus72.text')} imageSrc={ASSETS.FITTIPALDI.LOTUS72} priority={true} />
          <TimelineCard alignment="left" variant="yellow" period={t('fittipaldi.mclaren74.period')} title={t('fittipaldi.mclaren74.title')} text={t('fittipaldi.mclaren74.text')} imageSrc={ASSETS.FITTIPALDI.MCLAREN74} priority={true} />
          <TimelineCard alignment="right" variant="green" period={t('fittipaldi.copersucar.period')} title={t('fittipaldi.copersucar.title')} text={t('fittipaldi.copersucar.text')} imageSrc={ASSETS.FITTIPALDI.COPERSUCAR} />
          <TimelineCard alignment="left" variant="white" period={t('fittipaldi.indy.period')} title={t('fittipaldi.indy.title')} text={t('fittipaldi.indy.text')} imageSrc={ASSETS.FITTIPALDI.INDY} />
        </div>
      </div>
    </section>
  );
}