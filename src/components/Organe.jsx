import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ModelOrgane from "./Models/ModelOrgane";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext"; // ggf. Pfad anpassen
import { useMediaQuery } from "react-responsive";

const Organe = ({ heading, theme = "blue", chapterIntro = false }) => {
  const { lang } = useLanguage();
  const isTouchLayout = useMediaQuery({ query: "(max-width: 1024px)" });
  const [controlsEnabled, setControlsEnabled] = useState(!isTouchLayout);
  const contentRef = useRef(null);
  const hasAnimatedRef = useRef(false);

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

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { x: 180, opacity: 0 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting || hasAnimatedRef.current) return;

          hasAnimatedRef.current = true;
          gsap.to(contentRef.current, {
            x: 0,
            opacity: 1,
            duration: chapterIntro ? 1.2 : 1.05,
            ease: "power3.out",
          });

          observer.disconnect();
        },
        { threshold: 0.25 }
      );

      observer.observe(contentRef.current);

      return () => observer.disconnect();
    }, contentRef);

    return () => ctx.revert();
  }, [chapterIntro]);

  const lineSrc = getAsset(theme, "line");
  const interactionSrc = getAsset(theme, "interaction");
  const interactionLabel = controlsEnabled
    ? { de: "Interaktion stoppen", en: "Stop interaction" }
    : { de: "Interaktion starten", en: "Start interaction" };

  return (
    <section id="organe" className="relative overflow-hidden">
      <div ref={contentRef}>
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
            <ModelOrgane controlsEnabled={controlsEnabled} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Organe;
