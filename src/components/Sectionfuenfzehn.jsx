import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";

gsap.registerPlugin(ScrollTrigger);

const Sectionfuenfzehn = ({
  theme = "blue", // ✅ NEW
  heading,
  l1Text,
  l2LeftText,
  l2ImageSrc,
  l2ImageAlt = "",
}) => {
  const containerRef = useRef(null);
  const layout1Ref = useRef(null);
  const layout2Ref = useRef(null);
  const step1Ref = useRef(null);
  const step5Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(layout2Ref.current, { opacity: 0, x: 200 });
      gsap.set(step1Ref.current, { opacity: 0, x: 30 });
      gsap.set(step5Ref.current, { opacity: 0, x: 30 });

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
      tl.to(layout2Ref.current, { opacity: 1, x: 0, duration: 0.8 });
      tl.to(step1Ref.current, { opacity: 1, x: 0, duration: 0.6 });
      tl.to(step5Ref.current, { opacity: 1, x: 0, duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line"); // ✅ theme-based line

  return (
    <ScrollSection id="sectionfuenfzehn" ref={containerRef}>
      {/* Layout 1 */}
      <SplitPanel
        ref={layout1Ref}
        left={
          <h2>
            {heading}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={<p>{l1Text}</p>}
      />

      {/* Layout 2 */}
      <SplitPanel
        ref={layout2Ref}
        left={<p ref={step1Ref}>{l2LeftText}</p>}
        right={
          <img
            ref={step5Ref}
            src={l2ImageSrc}   // ❗ bleibt unverändert
            alt={l2ImageAlt}
            className="max-w-full h-auto"
          />
        }
      />
    </ScrollSection>
  );
};

export default Sectionfuenfzehn;