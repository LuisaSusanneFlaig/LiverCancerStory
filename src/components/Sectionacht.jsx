import React, { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";// ✅ Pfad ggf. anpassen

gsap.registerPlugin(ScrollTrigger);

const Sectionacht = ({
  theme = "blue", // ✅ NEW
  heading,
  introText,
  items = [], // ✅ [{ assetKey, text, alt? }]
}) => {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];

  const addToRefs = useCallback((el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, { opacity: 0, x: 120 });
      gsap.set(introRef.current, { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(introRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
      });

      tl.to(
        cardRefs.current,
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const firstRow = items.slice(0, 3);
  const secondRow = items.slice(3);

  const lineSrc = getAsset(theme, "line");

  return (
    <ScrollSection ref={sectionRef} id="sectionacht">
      {/* INTRO CONTENT */}
      <SplitPanel
        ref={introRef}
        left={
          <h2>
            {heading}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={<p>{introText}</p>}
      />

      {/* ICON GRID */}
      <div className="absolute inset-0 flex items-center justify-center p-20">
        <div className="grid grid-cols-3 gap-8">
          {/* FIRST ROW */}
          {firstRow.map((item, idx) => {
            const src = item.assetKey ? getAsset(theme, item.assetKey) : undefined;

            return (
              <div
                key={idx}
                ref={addToRefs}
                className="flex flex-col items-center text-center"
              >
                <div className="h-32 w-full flex items-center justify-center">
                  {src ? (
                    <img
                      src={src}
                      alt={item.alt || item.text}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : null}
                </div>
                <p className="mt-4">{item.text}</p>
              </div>
            );
          })}

          {/* SECOND ROW */}
          <div className="col-span-3 grid grid-cols-4 gap-8">
            {secondRow.map((item, idx) => {
              const src = item.assetKey ? getAsset(theme, item.assetKey) : undefined;

              return (
                <div
                  key={idx + 3}
                  ref={addToRefs}
                  className="flex flex-col items-center text-center"
                >
                  <div className="h-32 w-full flex items-center justify-center">
                    {src ? (
                      <img
                        src={src}
                        alt={item.alt || item.text}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : null}
                  </div>
                  <p className="mt-4">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};

export default Sectionacht;