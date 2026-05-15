"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface EditorialTextProps {
  content: string;
  delay?: number;
  className?: string;
}

export function EditorialText({ content, delay = 0, className = "" }: EditorialTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const isFirstRender = useRef(true);

  useGSAP(() => {
    if (isFirstRender.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 0.8, y: 0, duration: 0.8, ease: "power3.out", delay: delay }
      );
      isFirstRender.current = false;
    } else {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 5 },
        { opacity: 0.8, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, { dependencies: [content] });

  return (
    <p
      ref={textRef}
      className={`text-xs md:text-sm leading-relaxed text-left opacity-80 ${className}`}
    >
      {content}
    </p>
  );
}