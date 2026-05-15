"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface EditorialTitleProps {
  topWord: string;
  middleWord: string;
  bottomWord: string;
}

export function EditorialTitle({ topWord, middleWord, bottomWord }: EditorialTitleProps) {
  const container = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  useGSAP(() => {
    if (isFirstRender.current) {
      gsap.fromTo(".gsap-reveal",
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 2.4 }
      );
      isFirstRender.current = false;
    } else {
      gsap.fromTo(".gsap-reveal",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, { scope: container, dependencies: [topWord, middleWord, bottomWord] });

  return (
    <div ref={container} className="flex flex-col items-start leading-[0.85] md:leading-[0.8] uppercase whitespace-nowrap">
      <div className="overflow-hidden pb-2">
        <div className="gsap-reveal">
          <h1 className="text-[15.5vw] md:text-[11vw] lg:text-[9vw] opacity-30">
            {topWord}
          </h1>
        </div>
      </div>
      <div className="flex items-baseline gap-3 md:gap-6 lg:gap-8 mt-2 md:mt-0">
        <div className="overflow-hidden pb-4">
          <div className="gsap-reveal">
            <span className="block font-cursive lowercase text-3xl md:text-6xl lg:text-7xl opacity-80">
              {middleWord}
            </span>
          </div>
        </div>
        <div className="overflow-hidden pb-2">
          <div className="gsap-reveal">
            <h1 className="text-[15.5vw] md:text-[11vw] lg:text-[9vw] opacity-95">
              {bottomWord}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}