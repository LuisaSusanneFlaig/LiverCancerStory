import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";

gsap.registerPlugin(ScrollTrigger);

const Sectiondreizehn = ({
  theme = "blue", // ✅ NEW
  heading,

  // Layout 1
  l1Text1,
  l1Text2,
  l1Rate,
  l1RateImageKey, // ✅ e.g. "manandwoman"
  l1RateImageAlt = "",

  // Step 1
  step1Label,

  // Step 2
  step2Text,
  step2FemaleRate,
  step2FemaleIconKey, // ✅ e.g. "woman"
  step2FemaleIconAlt = "",
  step2MaleRate,
  step2MaleIconKey, // ✅ e.g. "man"
  step2MaleIconAlt = "",

  // Step 3
  step3Text,
  step3Rate,
  step3IconKey, // ✅ e.g. "manandwoman"
  step3IconAlt = "",
}) => {
  const containerRef = useRef(null);
  const layout1Ref = useRef(null);
  const layout2Ref = useRef(null);
  const step1Ref = useRef(null);
  const step2TextRef = useRef(null);
  const step2ImagesRef = useRef(null);
  const step3TextRef = useRef(null);
  const step3ImageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(layout2Ref.current, { opacity: 0, x: 200 });
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

      tl.to(layout1Ref.current, { x: -200, opacity: 0, duration: 1 });
      tl.to(layout2Ref.current, { opacity: 1, x: 0, duration: 0.6 });
      tl.to(step1Ref.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(step2TextRef.current, { opacity: 1, x: 0, duration: 0.5 });
      tl.to(step2ImagesRef.current, { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 });
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
            {heading}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={
          <>
            <p>{l1Text1}</p>
            <p>{l1Text2}</p>

            <div className="flex flex-col m-20">
              <h2>{l1Rate}</h2>
              {l1IconSrc ? (
                <img src={l1IconSrc} alt={l1RateImageAlt} className="w-32 h-auto" />
              ) : null}
            </div>
          </>
        }
      />

      {/* LAYOUT 2 */}
      <SplitPanel
        ref={layout2Ref}
        left={
          <div ref={step1Ref} className="grid grid-cols-2 m-20">
            <p>{step1Label}</p>
            <div className="w-1 bg-blue-500 h-full" />
          </div>
        }
        right={
          <>
            <div className="grid mb-20">
              {/* STEP 2 TEXT */}
              <p ref={step2TextRef}>{step2Text}</p>

              {/* STEP 2 ICONS */}
              <div ref={step2ImagesRef} className="grid grid-cols-2 mt-20">
                <div className="flex flex-row">
                  <p>{step2FemaleRate}</p>
                  {femaleSrc ? (
                    <img src={femaleSrc} alt={step2FemaleIconAlt} className="w-16 h-16" />
                  ) : null}
                </div>
                <div className="flex flex-row">
                  <p>{step2MaleRate}</p>
                  {maleSrc ? (
                    <img src={maleSrc} alt={step2MaleIconAlt} className="w-16 h-16" />
                  ) : null}
                </div>
              </div>
            </div>

            {/* STEP 3 TEXT */}
            <p ref={step3TextRef}>{step3Text}</p>

            {/* STEP 3 ICON */}
            <div ref={step3ImageRef} className="flex flex-row">
              <p>{step3Rate}</p>
              {step3Src ? (
                <img src={step3Src} alt={step3IconAlt} className="w-12 h-12" />
              ) : null}
            </div>
          </>
        }
      />
    </ScrollSection>
  );
};

export default Sectiondreizehn;