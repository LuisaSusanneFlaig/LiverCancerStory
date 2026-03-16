import React, { useEffect, useState } from "react";
import ModelMetastasen from "./Models/ModelMetastasen";
import { getAsset } from "../../constants/themeAssets";
import { useMediaQuery } from "react-responsive";
import { useLanguage } from "./Context/LanguageContext";

const Sectionsieben = ({ theme = "blue" }) => {
  const { lang } = useLanguage();
  const isTouchLayout = useMediaQuery({ query: "(max-width: 1024px)" });
  const [controlsEnabled, setControlsEnabled] = useState(!isTouchLayout);
  const interactionSrc = getAsset(theme, "interaction");
  const interactionLabel = controlsEnabled
    ? { de: "Interaktion stoppen", en: "Stop interaction" }
    : { de: "Interaktion starten", en: "Start interaction" };

  useEffect(() => {
    setControlsEnabled(!isTouchLayout);
  }, [isTouchLayout]);

  const t = (value) => {
    if (typeof value === "string") return value;
    if (!value) return "";
    return value[lang] ?? value.de ?? "";
  };

  return (
    <section id="sectionsieben" className="relative overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          aria-pressed={controlsEnabled}
          aria-label={t(interactionLabel)}
          onClick={() => setControlsEnabled((value) => !value)}
          className={`z-20 flex items-center gap-3 rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-slate-900 shadow-md backdrop-blur-sm transition-opacity ${
            controlsEnabled ? "opacity-100" : "opacity-65"
          }`}
        >
          <img
            src={interactionSrc}
            alt=""
            className="w-10 md:w-12 lg:w-14"
          />
          <span>{t(interactionLabel)}</span>
        </button>

        <div className="hero-3d-layout relative w-full">
        <ModelMetastasen controlsEnabled={controlsEnabled} />
        </div>
      </div>
    </section>
  );
};

export default Sectionsieben;
