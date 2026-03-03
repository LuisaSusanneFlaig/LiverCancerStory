import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext"; // ✅ Pfad ggf. anpassen

gsap.registerPlugin(ScrollTrigger);

const Sectionzehn = ({
  theme = "blue",

  heading,

  l1Text,
  l1ImageKey, // ✅ "behandlung" (theme + language)
  l1ImageAlt = "",

  l2LeftText,
  l2RightText,

  l3LeftText,
  l3ImageSrc, // ✅ string ODER {de,en}
  l3ImageAlt = "",
  l3Order = "textFirst",
}) => {
  const { lang = "de" } = useLanguage();

  const t = useMemo(() => {
    return (value) => {
      if (typeof value === "string") return value;
      if (!value) return "";
      return value[lang] ?? value.de ?? value.en ?? "";
    };
  }, [lang]);

  const pickImg = useMemo(() => {
    return (img) => {
      if (!img) return "";
      if (typeof img === "string") return img;
      return img[lang] ?? img.de ?? img.en ?? "";
    };
  }, [lang]);

  const containerRef = useRef(null);
  const layout1Ref = useRef(null);
  const layout2Ref = useRef(null);
  const layout3Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([layout2Ref.current, layout3Ref.current], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(layout1Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout2Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout2Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout3Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line"); // line bleibt theme-only
 const l1ImgSrc = l1ImageKey ? getAsset(theme, l1ImageKey, lang) : undefined;// ✅ theme + language
  const l3ImgSrc = pickImg(l3ImageSrc); // ✅ language only

  return (
    <ScrollSection id="sectionzehn" ref={containerRef}>
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
            <p>{t(l1Text)}</p>
            {l1ImgSrc ? <img src={l1ImgSrc} alt={t(l1ImageAlt)} /> : null}
          </>
        }
      />

      <SplitPanel
        ref={layout2Ref}
        left={<p>{t(l2LeftText)}</p>}
        right={<p>{t(l2RightText)}</p>}
      />

      <SplitPanel
        ref={layout3Ref}
        left={
          l3Order === "imageFirst" ? (
            l3ImgSrc ? <img src={l3ImgSrc} alt={t(l3ImageAlt)} /> : null
          ) : (
            <p>{t(l3LeftText)}</p>
          )
        }
        right={
          l3Order === "imageFirst" ? (
            <p>{t(l3LeftText)}</p>
          ) : l3ImgSrc ? (
            <img src={l3ImgSrc} alt={t(l3ImageAlt)} />
          ) : null
        }
      />
    </ScrollSection>
  );
};

export default Sectionzehn;