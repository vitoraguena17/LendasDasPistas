"use client";
import { useLanguage } from "@/contexts/language-context";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-[10px] md:text-xs font-medium uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity"
    >
      <span className={`transition-colors duration-300 ${language === "PT" ? "text-zinc-900 font-bold" : "text-zinc-400"}`}>
        PT
      </span>
      
      <span className="text-zinc-300">/</span>
      
      <span className={`transition-colors duration-300 ${language === "EN" ? "text-zinc-900 font-bold" : "text-zinc-400"}`}>
        EN
      </span>
    </button>
  );
}