import React, { useMemo } from "react";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { useLanguage } from "./Context/LanguageContext"; // ggf. Pfad anpassen

const Sectionsechs = ({ leftText, rightText }) => {
  const { lang } = useLanguage();

  const t = useMemo(() => {
    return (value) => {
      if (typeof value === "string") return value;
      if (!value) return "";
      return value[lang] ?? value.de ?? "";
    };
  }, [lang]);

  return (
    <section
      id="sectionsechs"
      className="relative h-screen overflow-hidden"
    >
      <SplitPanel
        left={<p>{t(leftText)}</p>}
        right={<p>{t(rightText)}</p>}
      />
    </section>
  );
};

export default Sectionsechs;