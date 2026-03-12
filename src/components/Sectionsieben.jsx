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
    ? { de: "3D-Interaktion ausschalten", en: "Turn off 3D interaction" }
    : { de: "3D-Interaktion einschalten", en: "Turn on 3D interaction" };

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
        <ModelMetastasen controlsEnabled={controlsEnabled} />
      </div>
    </section>
  );
};

export default Sectionsieben;
