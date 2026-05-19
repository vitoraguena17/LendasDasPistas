"use client";
import { forwardRef } from "react";
import Image from "next/image";

interface TimelineCardProps {
  alignment: "left" | "right";
  variant: "zinc" | "yellow" | "green" | "white";
  period: string;
  title: string;
  text: string;
  imageSrc?: string;
  priority?: boolean;
}

export const TimelineCard = forwardRef<HTMLDivElement, TimelineCardProps>(
  ({ alignment, period, title, text, imageSrc, priority = false }, ref) => {

    return (
      <div ref={ref} className="relative flex w-full justify-between items-center pl-16 md:pl-0 timeline-card">

        <div className="card-reveal hidden md:block absolute left-[calc(50%-10px)] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-[#f2f2f2] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] z-10 card-dot" />

        <div className={`w-full md:w-[45%] bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-zinc-200 group card-content shadow-[0_20px_40px_rgba(0,0,0,0.30)] ${alignment === 'right' ? 'md:order-2' : 'md:order-1'}`}>
          <span className="card-reveal inline-block text-zinc-900 text-[10px] font-bold tracking-widest uppercase">{period}</span>
          <h3 className="card-reveal text-2xl md:text-3xl mt-2 mb-4 font-medium text-zinc-900">{title}</h3>
          <p className="card-reveal text-zinc-600 leading-relaxed text-sm md:text-base">{text}</p>
        </div>

        {imageSrc ? (
          <div className={`card-reveal hidden md:block w-[45%] h-72 lg:h-100 relative rounded-3xl card-image shadow-[0_25px_50px_-12px_rgba(0,0,0,0.60)] ${alignment === 'right' ? 'md:order-1' : 'md:order-2'}`}>
            <div className="w-full h-full rounded-3xl overflow-hidden" style={{ filter: 'grayscale(100%)' }}>
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 1024px) 50vw, 1000px"
                priority={priority}
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-[45%]" />
        )}
      </div>
    );
  }
);

TimelineCard.displayName = "TimelineCard";