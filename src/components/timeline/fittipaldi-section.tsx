"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";
import { api } from "@/lib/api";
import { YouTubePlayer } from "../audio/yt-player";
import { TimelineTrack } from "../ui/timeline-track";
import { TimelineCard } from "../ui/timeline-card";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FittipaldiSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const [wins, setWins] = useState<string>("-");
  const [titles, setTitles] = useState<string>("-");
  const [isSectionActive, setIsSectionActive] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const winsRes = await api.get('drivers/emerson_fittipaldi/results/1.json?limit=1');
        setWins(winsRes.data.MRData.total);
        setTitles("2");
      } catch (e) {
        setWins("14");
        setTitles("2");
      }
    }
    fetchStats();
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
    <section ref={sectionRef} className="relative w-full bg-[#f2f2f2] text-zinc-900 py-32 overflow-hidden">

      <YouTubePlayer
        videoId="WfXK7iVPmsw"
        trackTitle="Lotus 72D"
        trackArtist="Zé Roberto"
        isActive={isSectionActive}
        accentClass="accent-green-500"
        textAccentClass="text-green-600"
      />

      <div className="relative z-10 max-w-350 mx-auto px-6 pt-20">

        <TimelineTrack />

        <div className="text-center md:mb-48 mb-24 ml-10 md:ml-0 timeline-card">
          <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r from-green-600 to-yellow-500 drop-shadow-sm">
            {t('fittipaldi.name')}
          </h2>
          <p className="text-zinc-500 mt-2 font-cursive text-4xl">"{t('fittipaldi.nickname')}"</p>

          <div className="flex justify-center gap-6 md:gap-12 mt-12">
            <div className="bg-white/60 backdrop-blur-md px-6 md:px-8 py-4 rounded-2xl border border-zinc-200 shadow-sm">
              <span className="block text-5xl font-bold text-zinc-900">{titles}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Títulos Mundiais</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md px-6 md:px-8 py-4 rounded-2xl border border-zinc-200 shadow-sm">
              <span className="block text-5xl font-bold text-zinc-900">{wins}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Vitórias (F1)</span>
            </div>
          </div>
        </div>

        <div className="space-y-32 pb-32">
          <TimelineCard alignment="left" variant="zinc" period={t('fittipaldi.preF1.period')} title={t('fittipaldi.preF1.title')} text={t('fittipaldi.preF1.text')} imageSrc="/fittipaldi/img-fitti-1.jpg" />
          <TimelineCard alignment="right" variant="yellow" period={t('fittipaldi.lotus72.period')} title={t('fittipaldi.lotus72.title')} text={t('fittipaldi.lotus72.text')} imageSrc="/fittipaldi/img-fitti-2.jpg" />
          <TimelineCard alignment="left" variant="yellow" period={t('fittipaldi.mclaren74.period')} title={t('fittipaldi.mclaren74.title')} text={t('fittipaldi.mclaren74.text')} imageSrc="/fittipaldi/img-fitti-3.webp" />
          <TimelineCard alignment="right" variant="green" period={t('fittipaldi.copersucar.period')} title={t('fittipaldi.copersucar.title')} text={t('fittipaldi.copersucar.text')} imageSrc="/fittipaldi/img-fitti-4.jpg" />
          <TimelineCard alignment="left" variant="white" period={t('fittipaldi.indy.period')} title={t('fittipaldi.indy.title')} text={t('fittipaldi.indy.text')} imageSrc="/fittipaldi/img-fitti-5.webp" />
        </div>
      </div>
    </section>
  );
}