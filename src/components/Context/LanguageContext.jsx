import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "de");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang; // <html lang="de|en">
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "de" ? "en" : "de"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}