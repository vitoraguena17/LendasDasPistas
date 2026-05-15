"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface EditorialImageProps {
  src: string;
  alt: string;
}

export function EditorialImage({ src, alt }: EditorialImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(imageRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
        delay: 1.7
      }
    );
  }, []);
  
  return (
    <div
      ref={imageRef}
      className="w-full h-full md:h-[65dvh] lg:h-[75dvh] overflow-hidden relative transition-all duration-[1.5s] grayscale hover:grayscale-0 cursor-pointer"
      style={{
        WebkitMaskImage: `
          linear-gradient(to top, transparent 0%, black 15%),
          linear-gradient(to left, transparent 0%, black 5%),
          linear-gradient(to right, transparent 0%, black 5%)
        `,
        WebkitMaskComposite: "source-in",

        maskImage: `
          linear-gradient(to top, transparent 0%, black 15%),
          linear-gradient(to left, transparent 0%, black 5%),
          linear-gradient(to right, transparent 0%, black 5%)
        `,
        maskComposite: "intersect"
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 66vw"
        className="object-cover object-center"
      />
    </div>
  );
}