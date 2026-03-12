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
    ? { de: "3D-Interaktion ausschalten", en: "Turn off 3D interaction" }
    : { de: "3D-Interaktion einschalten", en: "Turn on 3D interaction" };

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

      <div className="hero-3d-layout relative">
        <button
          type="button"
          aria-pressed={controlsEnabled}
          aria-label={t(interactionLabel)}
          onClick={() => setControlsEnabled((value) => !value)}
          className={`absolute top-4 left-1/2 z-20 -translate-x-1/2 rounded-full transition-opacity ${
            controlsEnabled ? "opacity-100" : "opacity-65"
          }`}
        >
          <img
            src={interactionSrc}
            alt=""
            className="w-16 md:w-20 lg:w-24"
          />
        </button>
        <ModelLeber controlsEnabled={controlsEnabled} />
      </div>
    </section>
  );
};

export default Leber;
