import React, { useMemo } from "react";
import ModelLeber from "./Models/ModelLeber";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext"; // ggf. Pfad anpassen

const Leber = ({ heading, theme = "blue" }) => {
  const { lang } = useLanguage();

  const t = useMemo(() => {
    return (value) => {
      if (typeof value === "string") return value;
      if (!value) return "";
      return value[lang] ?? value.de ?? "";
    };
  }, [lang]);

  const lineSrc = getAsset(theme, "line");
  const interactionSrc = getAsset(theme, "interaction");

  return (
    <section id="leber" className="relative h-screen overflow-hidden">
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
        <img
          src={interactionSrc}
          alt="Interaction icon"
          className="pointer-events-none absolute top-4 left-1/2 z-20 w-16 -translate-x-1/2 md:w-20 lg:w-24"
        />
        <ModelLeber />
      </div>
    </section>
  );
};

export default Leber;
