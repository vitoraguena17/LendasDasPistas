"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { F1Logo } from "./logo";
import { LanguageSwitcher } from "./language-switch";

gsap.registerPlugin(useGSAP);

export function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".gsap-header-item", {
      y: -20,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 2.6,
    });
  }, { scope: headerRef });

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full h-[8dvh] z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 bg-[#f2f2f2]/80 backdrop-blur-md border-b border-zinc-200/50 transition-all duration-300">
      <div className="gsap-header-item">
        <F1Logo />
      </div>
      <div className="gsap-header-item">
        <LanguageSwitcher />
      </div>
    </header>
  );
}