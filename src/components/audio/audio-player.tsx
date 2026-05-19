"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";

interface AudioPlayerProps {
  audioSrc: string;
  trackTitle: string;
  trackArtist: string;
  isActive: boolean;
  accentClass?: string;
  textAccentClass?: string;
}

export function AudioPlayer({
  audioSrc,
  trackTitle,
  trackArtist,
  isActive,
  accentClass = "accent-green-500",
  textAccentClass = "text-green-400"
}: AudioPlayerProps) {
  const { t } = useLanguage();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Volume do usuário vai de 0 a 100. O HTML5 usa de 0.0 a 1.0, então dividimos por 100 depois.
  const [userVolume, setUserVolume] = useState(5);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [showUI, setShowUI] = useState(false);

  useGSAP(() => {
    if (!audioRef.current) return;

    if (isActive && !isPausedByUser) {
      setShowUI(true);
      
      // O navegador pode bloquear o autoplay se o usuário não tiver clicado na tela ainda.
      // O .catch() ignora o erro de forma silenciosa para não sujar o console.
      audioRef.current.play().catch(() => console.log("Aguardando interação do usuário para tocar o áudio"));

      gsap.to(audioRef.current, {
        volume: userVolume / 100, // Converte 5% para 0.05
        duration: 2,
        overwrite: "auto"
      });
    } else {
      gsap.to(audioRef.current, {
        volume: 0,
        duration: 1.5,
        overwrite: "auto",
        onComplete: () => {
          if (!isActive) {
            setShowUI(false);
            audioRef.current?.pause();
          }
        }
      });
    }
  }, [isActive, userVolume, isPausedByUser]);

  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setUserVolume(val);
    if (val > 0 && isPausedByUser) {
      setIsPausedByUser(false);
    }
    // Ajusta imediatamente caso o áudio já esteja tocando
    if (audioRef.current) {
        audioRef.current.volume = val / 100;
    }
  };

  return (
    <>
      {/* Elemento de Áudio Nativo do Navegador (Invisível) */}
      <audio ref={audioRef} src={audioSrc} loop preload="auto" className="hidden" />

      {/* Interface Flutuante Idêntica à Anterior */}
      <div className={`fixed bottom-8 right-6 md:right-12 z-50 bg-[#09090b]/90 backdrop-blur-xl border border-zinc-800 rounded-full p-2 pr-6 flex items-center gap-5 transition-all duration-700 shadow-2xl ${showUI ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <button
          onClick={() => setIsPausedByUser(!isPausedByUser)}
          className="w-12 h-12 shrink-0 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          {!isPausedByUser ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        <div className="hidden sm:flex flex-col justify-center">
          <p className={`text-[9px] uppercase tracking-[0.2em] font-bold mb-0.5 ${textAccentClass}`}>{t('ui.soundtrack')}</p>
          <p className="text-xs font-medium text-zinc-300 whitespace-nowrap">{trackArtist} - {trackTitle}</p>
        </div>

        <div className="hidden sm:block w-px h-8 bg-zinc-800 mx-1" />

        <div className="hidden sm:flex items-center gap-2 group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={userVolume}
            onChange={handleVolumeSlider}
            className={`w-20 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer ${accentClass}`}
          />
        </div>
      </div>
    </>
  );
}