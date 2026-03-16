import React, { useEffect, useMemo, useState } from "react";
import ModelLeber from "./Models/ModelLeber";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext"; // ggf. Pfad anpassen
import { useMediaQuery } from "react-responsive";

const Leber = ({ heading, theme = "blue" }) => {
  const { lang } = useLanguage();
  const isTouchLayout = useMediaQuery({ query: "(max-width: 1024px)" });
  const [controlsEnabled, setControlsEnabled] = useState(!isTouchLayout);

  const t = useMemo(() => {
    return (value) => {
      if (typeof value === "string") return value;
      if (!value) return "";
      return value[lang] ?? value.de ?? "";
    };
  }, [lang]);

  useEffect(() => {
    setControlsEnabled(!isTouchLayout);
  }, [isTouchLayout]);

  const lineSrc = getAsset(theme, "line");
  const interactionSrc = getAsset(theme, "interaction");
  const interactionLabel = controlsEnabled
    ? { de: "Interaktion stoppen", en: "Stop interaction" }
    : { de: "Interaktion starten", en: "Start interaction" };

  return (
    <section id="leber" className="relative overflow-hidden">
      <div className="flex flex-col gap-7 p-20">
        <h2>
          {t(heading)}
          <img
            src={lineSrc}
            alt="Decorative line"
            className="mt-4 mb-6"
          />
        </h2>
      </div>

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
        <ModelLeber controlsEnabled={controlsEnabled} />
        </div>
      </div>
    </section>
  );
};

export default Leber;
