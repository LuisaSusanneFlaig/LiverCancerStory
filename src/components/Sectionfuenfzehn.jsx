import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";
import { useLanguage } from "./Context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Sectionfuenfzehn = ({
  theme = "blue",
  version = "A",
  heading,
  l1Text,
  l2LeftText,
  l2ImageSrc,
  l2ImageAlt = "",
  l2AltImageSrc = "",
  l2AltImageAlt = "",
  l2ExtraItems = [],
}) => {
  const { lang } = useLanguage();

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
  const step5Ref = useRef(null);
  const extraItem1Ref = useRef(null);
  const extraItem2Ref = useRef(null);
  const extraItem3Ref = useRef(null);

  const useAltLayout2 =
    (version === "B" || version === "C") && l2ExtraItems.length === 3;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(layout2Ref.current, { opacity: 0, x: 200 });
      gsap.set(step1Ref.current, { opacity: 0, x: 30 });

      if (useAltLayout2) {
        gsap.set(step5Ref.current, { opacity: 0, x: 30 });
        gsap.set(extraItem1Ref.current, { opacity: 0, x: 30 });
        gsap.set(extraItem2Ref.current, { opacity: 0, x: 30 });
        gsap.set(extraItem3Ref.current, { opacity: 0, x: 30 });
      } else {
        gsap.set(step5Ref.current, { opacity: 0, x: 30 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: useAltLayout2 ? "+=400%" : "+=260%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(layout1Ref.current, { x: -200, opacity: 0, duration: 1 });
      tl.to(
        layout2Ref.current,
        { opacity: 1, x: 0, duration: 0.8 },
        useAltLayout2 ? "-=0.2" : "-=0.5"
      );
      tl.to(step1Ref.current, { opacity: 1, x: 0, duration: 0.6 });

      if (useAltLayout2) {
        tl.to(extraItem1Ref.current, { opacity: 1, x: 0, duration: 0.4 });
        tl.to(extraItem2Ref.current, { opacity: 1, x: 0, duration: 0.4 });
        tl.to(extraItem3Ref.current, { opacity: 1, x: 0, duration: 0.4 });
        tl.to(step5Ref.current, { opacity: 1, x: 0, duration: 0.4 });
      } else {
        tl.to(step5Ref.current, { opacity: 1, x: 0, duration: 0.6 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [useAltLayout2]);

  const lineSrc = getAsset(theme, "line");

  return (
    <ScrollSection id="sectionfuenfzehn" ref={containerRef}>
      <SplitPanel
        ref={layout1Ref}
        left={
          <h2>
            {t(heading)}
            {lineSrc ? (
              <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
            ) : null}
          </h2>
        }
        right={<p>{t(l1Text)}</p>}
      />

      <SplitPanel
        ref={layout2Ref}
        left={
          useAltLayout2 ? (
            <div className="w-full max-w-3xl grid grid-cols-1 gap-6">
              <p ref={step1Ref}>{t(l2LeftText)}</p>

              {l2ExtraItems.map((item, index) => {
                const itemRef =
                  index === 0
                    ? extraItem1Ref
                    : index === 1
                      ? extraItem2Ref
                      : extraItem3Ref;
                const iconSrc = item?.iconKey
                  ? getAsset(theme, item.iconKey, lang)
                  : undefined;

                return (
                  <div
                    key={`l2-extra-${index}`}
                    ref={itemRef}
                    className="flex items-center gap-4"
                  >
                    {iconSrc ? (
                      <img
                        src={iconSrc}
                        alt={t(item?.iconAlt)}
                        className="w-14 h-14 md:w-16 md:h-16 object-contain shrink-0"
                      />
                    ) : null}
                    <p>{t(item?.text)}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p ref={step1Ref}>{t(l2LeftText)}</p>
          )
        }
        right={
          useAltLayout2 ? (
            l2AltImageSrc ? (
              <img
                ref={step5Ref}
                src={l2AltImageSrc}
                alt={t(l2AltImageAlt)}
                className="max-w-full h-auto"
              />
            ) : (
              <div
                ref={step5Ref}
                className="w-full h-52 md:h-64 rounded-lg border border-white/30 flex items-center justify-center text-center p-4"
              >
                <p className="!text-sm sm:!text-base md:!text-lg">
                  Image placeholder for version B/C layout 2
                </p>
              </div>
            )
          ) : (
            <img
              ref={step5Ref}
              src={l2ImageSrc}
              alt={t(l2ImageAlt)}
              className="max-w-full h-auto"
            />
          )
        }
      />
    </ScrollSection>
  );
};

export default Sectionfuenfzehn;
