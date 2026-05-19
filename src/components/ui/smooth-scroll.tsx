"use client";
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Sincroniza o relógio do Lenis com o motor do GSAP
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    // Limpeza quando o componente desmontar
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}