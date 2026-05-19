"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TimelineTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const zebraLeftRef = useRef<HTMLDivElement>(null);
  const zebraRightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. O Carrinho desce com "peso" (Inércia)
    gsap.to(carRef.current, {
      y: () => (trackRef.current ? trackRef.current.offsetHeight : 0),
      ease: "none",
      scrollTrigger: {
        trigger: trackRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1.5,
      }
    });

    // 2. Efeito de velocidade nas zebras
    ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const offset = self.progress * 1500;
        gsap.set([zebraLeftRef.current, zebraRightRef.current], { backgroundPosition: `0px ${offset}px` });
      }
    });
  }, { scope: trackRef });

  return (
    <div ref={trackRef} className="absolute left-7 md:left-1/2 top-0 bottom-0 w-12 md:w-16 md:-translate-x-1/2 flex z-0 rounded-full overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)] border-x-[3px] border-zinc-950 bg-zinc-950">

      {/* Zebra Esquerda Corrigida com Limitação de Tamanho Horizontal */}
      <div
        ref={zebraLeftRef}
        className="w-2 md:w-2.5 h-full opacity-90"
        style={{
          backgroundImage: 'repeating-linear-gradient(180deg, #22c55e 0px, #22c55e 20px, #facc15 20px, #facc15 40px)',
          backgroundSize: '100% 40px', // Força o bloco a ter 100% da largura da div
          backgroundRepeat: 'repeat-y' // Impede que crie colunas duplicadas para os lados
        }}
      />

      {/* Asfalto */}
      <div className="flex-1 bg-[#121214] relative overflow-visible shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
        {/* Faixa central pontilhada do asfalto */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(180deg, #ffffff 0px, #ffffff 15px, transparent 15px, transparent 30px)' }} />

        {/* LARGADA: Linha quadriculada de início no topo do asfalto */}
        <div className="absolute top-0 left-0 right-0 h-3 z-10 bg-black opacity-95 shadow-md border-b border-zinc-900" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px'
        }} />

        {/* O Carro de F1 (SVG Branco/Prata) */}
        <div ref={carRef} className="absolute top-0 left-[calc(50%-14px)] md:left-[calc(50%-18px)] w-7 h-12 md:w-9 md:h-14 -mt-6 z-20 will-change-transform">
          <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)]">
            <rect x="1" y="4" width="4" height="8" rx="1" fill="#27272a" />
            <rect x="19" y="4" width="4" height="8" rx="1" fill="#27272a" />
            <rect x="0" y="22" width="5" height="10" rx="1" fill="#27272a" />
            <rect x="19" y="22" width="5" height="10" rx="1" fill="#27272a" />
            <path d="M4 8 L10 12 M20 8 L14 12 M4 26 L10 24 M20 26 L14 24" stroke="#a1a1aa" strokeWidth="1" />
            <path d="M2 6 H22 V9 H2 Z" fill="#ffffff" />
            <path d="M10 2 L14 2 L15 10 L14 34 L10 34 L9 10 Z" fill="#f4f4f5" />
            <circle cx="12" cy="18" r="2.5" fill="#27272a" stroke="#ffffff" strokeWidth="0.5" />
            <rect x="4" y="31" width="16" height="4" rx="0.5" fill="#ffffff" />
          </svg>
        </div>

        {/* CHEGADA: Linha quadriculada de fim na base do asfalto */}
        <div className="absolute bottom-0 left-0 right-0 h-3 z-10 bg-black opacity-95 shadow-md border-t border-zinc-900" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px'
        }} />
      </div>

      {/* Zebra Direita Corrigida com Limitação de Tamanho Horizontal */}
      <div
        ref={zebraRightRef}
        className="w-2 md:w-2.5 h-full opacity-90"
        style={{
          backgroundImage: 'repeating-linear-gradient(180deg, #22c55e 0px, #22c55e 20px, #facc15 20px, #facc15 40px)',
          backgroundSize: '100% 40px', // Força o bloco a ter 100% da largura da div
          backgroundRepeat: 'repeat-y' // Impede que crie colunas duplicadas para os lados
        }}
      />
    </div>
  );
}