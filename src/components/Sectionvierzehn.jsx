import React, { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import CenterPanel from "./Layout/CenterPanel.jsx";
import { getAsset } from "../../constants/themeAssets";

gsap.registerPlugin(ScrollTrigger);

const Sectionvierzehn = ({
  theme = "blue", // ✅ NEW
  heading,
  introText,
  bullets = [],
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
      gsap.set(introRef.current, { x: 0, opacity: 1 });
      gsap.set(cardRefs.current, { x: 120, opacity: 0 });

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
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      tl.to(
        cardRefs.current,
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line");

  return (
    <ScrollSection ref={sectionRef} id="sectionvierzehn">
      <SplitPanel
        ref={introRef}
        left={
          <h2>
            {heading}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={
          <div>
            <p>{introText}</p>
            <ul className="list-disc m-10">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        }
      />

      <CenterPanel>
        <div className="grid grid-cols-2 gap-8">
          {items.map((item, idx) => {
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
        </div>
      </CenterPanel>
    </ScrollSection>
  );
};

export default Sectionvierzehn;