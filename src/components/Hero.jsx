import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useMemo } from "react";
import { SplitText } from "gsap/all";
import { getAsset } from "../../constants/themeAssets"; // Pfad ok?
import { useLanguage } from "./Context/LanguageContext"; // ✅ anpassen falls dein Pfad anders ist

const Hero = ({
  theme = "blue",

  // Option A: {de,en} ODER string
  title,
  subtitle,
  author,
  scrollText,

  scrollTarget = "#thomas",
}) => {
  const { lang } = useLanguage();

  const t = useMemo(() => {
    return (value) => {
      if (typeof value === "string") return value;
      if (!value) return "";
      return value[lang] ?? value.de ?? "";
    };
  }, [lang]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const heroSplit = new SplitText(".title", { type: "lines" });
      const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

      gsap.from(heroSplit.lines, {
        yPercent: 150,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 150,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      });

      gsap.to(".scroll-indicator", {
        y: 10,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 1,
        delay: 2,
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToDefinition = () => {
    gsap.to(window, {
      scrollTo: scrollTarget,
      duration: 1.2,
      ease: "power2.inOut",
    });
  };

  const lineSrc = getAsset(theme, "line"); // theme-only

  return (
    <section id="hero">
      <div className="flex flex-col items-center">
        <h1 className="title pt-20">{t(title)}</h1>

        <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />

        <h3 className="subtitle mt-10">{t(subtitle)}</h3>

        <p className="subtitle">{t(author)}</p>

        <p
          className="subtitle scroll-indicator pt-50 cursor-pointer"
          onClick={scrollToDefinition}
        >
          {t(scrollText)}
        </p>
      </div>
    </section>
  );
};

export default Hero;