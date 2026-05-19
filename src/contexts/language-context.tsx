"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import pt from "@/locales/pt.json";
import en from "@/locales/en.json";

type Language = "PT" | "EN";

const dictionaries = {
  PT: pt,
  EN: en,
};

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string; // Nossa nova função de tradução
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("PT");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "PT" ? "EN" : "PT"));
  };

  const t = (key: string) => {
    const value = getNestedValue(dictionaries[language], key);
    return value || key; 
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
}