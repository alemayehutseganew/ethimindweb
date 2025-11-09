"use client";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center gap-2 text-xs text-slate-300">
      <span className="hidden sm:inline">{t("lang.label")}</span>
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-2.5 py-1 rounded-lg border transition ${
          currentLang === "en"
            ? "border-cyan-400 text-white bg-cyan-400/10"
            : "border-white/10 hover:border-white/20"
        }`}
        aria-pressed={currentLang === "en"}
      >
        {t("lang.en")}
      </button>
      <button
        onClick={() => toggleLanguage("am")}
        className={`px-2.5 py-1 rounded-lg border transition ${
          currentLang === "am"
            ? "border-cyan-400 text-white bg-cyan-400/10"
            : "border-white/10 hover:border-white/20"
        }`}
        aria-pressed={currentLang === "am"}
      >
        {t("lang.am")}
      </button>
    </div>
  );
}
