"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/contexts/language-context";

interface YouTubePlayerProps {
  videoId: string;
  trackTitle: string;
  trackArtist: string;
  isActive: boolean;
  accentClass?: string;
  textAccentClass?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function YouTubePlayer({
  videoId,
  trackTitle,
  trackArtist,
  isActive,
  accentClass = "accent-green-500",
  textAccentClass = "text-green-400"
}: YouTubePlayerProps) {
  const { t } = useLanguage();
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // AQUI: Volume inicial reduzido para 5%
  const [userVolume, setUserVolume] = useState(5);
  const [currentVolume, setCurrentVolume] = useState(0);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showUI, setShowUI] = useState(false);

  const volProxy = useRef({ val: 0 });

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (containerRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(containerRef.current, {
          height: "0",
          width: "0",
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: () => {
              setIsPlayerReady(true);
            },
          },
        });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume && isPlayerReady) {
      playerRef.current.setVolume(currentVolume);
    }
  }, [currentVolume, isPlayerReady]);

  useGSAP(() => {
    if (!isPlayerReady || !playerRef.current) return;

    if (isActive && !isPausedByUser) {
      setShowUI(true);
      if (playerRef.current.playVideo) playerRef.current.playVideo();

      gsap.to(volProxy.current, {
        val: userVolume,
        duration: 2,
        overwrite: "auto",
        onUpdate: () => setCurrentVolume(volProxy.current.val)
      });
    } else {
      gsap.to(volProxy.current, {
        val: 0,
        duration: 1.5,
        overwrite: "auto",
        onUpdate: () => setCurrentVolume(volProxy.current.val),
        onComplete: () => {
          if (!isActive) {
            setShowUI(false);
            if (playerRef.current && playerRef.current.pauseVideo) {
              playerRef.current.pauseVideo();
            }
          }
        }
      });
    }
  }, [isActive, userVolume, isPausedByUser, isPlayerReady]);

  const handleVolumeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setUserVolume(val);
    if (val > 0 && isPausedByUser) {
      setIsPausedByUser(false);
    }
  };

  return (
    <>
      <div className="hidden">
        <div ref={containerRef} />
      </div>

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