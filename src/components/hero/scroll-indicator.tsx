"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function ScrollIndicator() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(scrollRef.current, {
      opacity: 0,
      y: 20, 
      duration: 1,
      delay: 4.0, 
      ease: "power2.out",
    });

    gsap.to(dotRef.current, {
      y: 12,          
      opacity: 0,   
      duration: 1.5,
      repeat: -1,      
      ease: "power2.out",
    });
  }, []);

  return (
    <div ref={scrollRef} className="flex flex-col items-center gap-3 opacity-60">
      <div className="w-5.5 h-8.5 border-[1.5px] border-zinc-900 rounded-full flex justify-center pt-2">
        <div ref={dotRef} className="w-0.75 h-0.75 bg-zinc-900 rounded-full" />
      
      </div>

      <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-zinc-900">
        Scroll
      </span>
    </div>
  );
}