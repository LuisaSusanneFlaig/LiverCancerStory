import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Sectionelf = ({
  theme = "blue",

  heading = "Heilende Behandlung für Leberkrebs",

  l1RightText,
  l1ImageSrc, // string ODER {de,en}
  l1ImageAlt = "",

  l2LeftText,
  l2ImageSrc, // string ODER {de,en}
  l2ImageAlt = "",

  l3LeftText,
  l3ImageSrc, // string ODER {de,en}
  l3ImageAlt = "",
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
      if (!img) return undefined;
      if (typeof img === "string") return img;
      return img[lang] ?? img.de ?? img.en ?? undefined;
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

      tl.fromTo(
        layout2Ref.current,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      );
      tl.to(layout2Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(
        layout3Ref.current,
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line");

  const img1 = pickImg(l1ImageSrc);
  const img2 = pickImg(l2ImageSrc);
  const img3 = pickImg(l3ImageSrc);

  return (
    <ScrollSection id="sectionelf" ref={containerRef}>
      {/* Layout 1 */}
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
            <p>{t(l1RightText)}</p>
            {img1 ? <img src={img1} alt={t(l1ImageAlt)} /> : null}
          </>
        }
      />

      {/* Layout 2 */}
      <SplitPanel
        ref={layout2Ref}
        left={<p>{t(l2LeftText)}</p>}
        right={img2 ? <img src={img2} alt={t(l2ImageAlt)} /> : null}
      />

      {/* Layout 3 */}
      <SplitPanel
        ref={layout3Ref}
        left={<p>{t(l3LeftText)}</p>}
        right={img3 ? <img src={img3} alt={t(l3ImageAlt)} /> : null}
      />
    </ScrollSection>
  );
};

export default Sectionelf;