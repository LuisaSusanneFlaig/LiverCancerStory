import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext"; // ✅ Pfad ggf. anpassen

gsap.registerPlugin(ScrollTrigger);

const Sectiondreizehn = ({
  theme = "blue",

  heading,

  // Layout 1
  l1Text1,
  l1Text2,
  l1Rate,
  l1RateImageKey,
  l1RateImageAlt = "",

  // Step 1
  step1Label,

  // Step 2
  step2Text,
  step2FemaleRate,
  step2FemaleIconKey,
  step2FemaleIconAlt = "",
  step2MaleRate,
  step2MaleIconKey,
  step2MaleIconAlt = "",

  // Step 3
  step3Text,
  step3Rate,
  step3IconKey,
  step3IconAlt = "",
}) => {
  const { lang } = useLanguage();

  // Option A: allow string OR {de,en}
  const t = useMemo(() => {
    return (value) => {
      if (typeof value === "string") return value;
      if (!value) return "";
      return value[lang] ?? value.de ?? "";
    };
  }, [lang]);

  const containerRef = useRef(null);
  const layout1Ref = useRef(null);
  const layout2Ref = useRef(null);
  const step1Ref = useRef(null);
  const step2TextRef = useRef(null);
  const step2ImagesRef = useRef(null);
  const step3TextRef = useRef(null);
  const step3ImageRef = useRef(null);
  const l1RateBlockRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(layout2Ref.current, { opacity: 0, x: 200 });
      gsap.set(l1RateBlockRef.current, { opacity: 0, x: 30 });
      gsap.set(step1Ref.current, { opacity: 0, x: 30 });
      gsap.set(step2TextRef.current, { opacity: 0, x: 30 });
      gsap.set(step2ImagesRef.current, { opacity: 0, x: 30 });
      gsap.set(step3TextRef.current, { opacity: 0, x: 30 });
      gsap.set(step3ImageRef.current, { opacity: 0, x: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(l1RateBlockRef.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(layout1Ref.current, { x: -200, opacity: 0, duration: 0.5 });
      tl.to(layout2Ref.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(step1Ref.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(step2TextRef.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(step2ImagesRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.2,
      });
      tl.to(step3TextRef.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(step3ImageRef.current, { opacity: 1, x: 0, duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line");
  const l1IconSrc = l1RateImageKey ? getAsset(theme, l1RateImageKey) : undefined;
  const femaleSrc = step2FemaleIconKey ? getAsset(theme, step2FemaleIconKey) : undefined;
  const maleSrc = step2MaleIconKey ? getAsset(theme, step2MaleIconKey) : undefined;
  const step3Src = step3IconKey ? getAsset(theme, step3IconKey) : undefined;

  return (
    <ScrollSection id="sectiondreizehn" ref={containerRef}>
      {/* LAYOUT 1 */}
      <SplitPanel
        ref={layout1Ref}
        left={
          <h2>
            {t(heading)}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={
          <>
            <p>{t(l1Text1)}</p>
            <p>{t(l1Text2)}</p>

            <div ref={l1RateBlockRef} className="flex flex-col ">
              <h2>{t(l1Rate)}</h2>
              {l1IconSrc ? (
                <img
                  src={l1IconSrc}
                  alt={t(l1RateImageAlt)}
                  className="w-20 md:w-40 h-auto object-contain"
                />
              ) : null}
            </div>
          </>
        }
      />

      {/* LAYOUT 2 */}
      <SplitPanel
        ref={layout2Ref}
        left={
          <div ref={step1Ref} className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-12 lg:gap-x-20 items-stretch">
            <p className="w-full max-w-xl mx-auto !text-center justify-self-center self-center">
              {t(step1Label)}
            </p>

            {/* ✅ Theme-based bar (uses your CSS variable) */}
            <div
              className="h-3 w-[85vw] max-w-md justify-self-center md:justify-self-end rounded-full md:w-3 md:h-full md:min-h-72 lg:min-h-[32rem]"
              style={{ backgroundColor: "var(--nav-active)" }}
            />
          </div>
        }
        right={
          <>
            <div className="grid ">
              {/* STEP 2 TEXT */}
              <p ref={step2TextRef}>{t(step2Text)}</p>

              {/* STEP 2 ICONS */}
              <div ref={step2ImagesRef} className="grid grid-cols-2 ">
                <div className="flex flex-col items-center gap-3 text-center">
                  <p>{t(step2FemaleRate)}</p>
                  {femaleSrc ? (
                    <img
                      src={femaleSrc}
                      alt={t(step2FemaleIconAlt)}
                      className="w-8 md:w-10 h-auto object-contain"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col items-center gap-3 text-center">
                  <p>{t(step2MaleRate)}</p>
                  {maleSrc ? (
                    <img
                      src={maleSrc}
                      alt={t(step2MaleIconAlt)}
                      className="w-8 md:w-10 h-auto object-contain"
                    />
                  ) : null}
                </div>
              </div>
            </div>

            {/* STEP 3 TEXT */}
            <p ref={step3TextRef}>{t(step3Text)}</p>

            {/* STEP 3 ICON */}
            <div ref={step3ImageRef} className="flex flex-col items-center gap-3 text-center -mt-10">
              <p>{t(step3Rate)}</p>
              {step3Src ? (
                <img
                  src={step3Src}
                  alt={t(step3IconAlt)}
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-26 lg:h-26 object-contain"
                />
              ) : null}
            </div>
          </>
        }
      />
    </ScrollSection>
  );
};

export default Sectiondreizehn;
