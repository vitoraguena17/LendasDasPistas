"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(logoRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        )
            .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.4
            });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-999 bg-zinc-950 flex items-center justify-center">
            <div ref={logoRef} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-yellow-400 flex items-center justify-center rounded-sm">
                    <span className="text-white text-2xl font-bold">F1</span>
                </div>
                <span className="text-white text-sm uppercase tracking-[0.4em] opacity-90 ml-[0.4em]">Brasil</span>
            </div>
        </div>
    );
}