"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";

type Language = "PT" | "EN";
const dictionaries = { PT: pt, EN: en };

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("PT");
  const [isChanging, setIsChanging] = useState(false);

  const toggleLanguage = () => {
    if (isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setLanguage((prev) => (prev === "PT" ? "EN" : "PT"));
      setTimeout(() => setIsChanging(false), 50);
    }, 400);
  };

  const t = (key: string) => {
    const value = getNestedValue(dictionaries[language], key);
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={`transition-opacity duration-500 ease-in-out ${isChanging ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage error");
  return context;
}