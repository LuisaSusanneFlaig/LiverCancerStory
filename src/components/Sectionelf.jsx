import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";

gsap.registerPlugin(ScrollTrigger);

const Sectionelf = ({
  theme = "blue", // ✅ NEW

  heading = "Heilende Behandlung für Leberkrebs",

  // Layout 1
  l1RightText,
  l1ImageSrc,
  l1ImageAlt = "",

  // Layout 2
  l2LeftText,
  l2ImageSrc,
  l2ImageAlt = "",

  // Layout 3
  l3LeftText,
  l3ImageSrc,
  l3ImageAlt = "",
}) => {
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

  const lineSrc = getAsset(theme, "line");

  return (
    <ScrollSection id="sectionelf" ref={containerRef}>
      {/* Layout 1 */}
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
            <p>{l1RightText}</p>
            {l1ImageSrc && <img src={l1ImageSrc} alt={l1ImageAlt} />}
          </>
        }
      />

      {/* Layout 2 */}
      <SplitPanel
        ref={layout2Ref}
        left={<p>{l2LeftText}</p>}
        right={l2ImageSrc ? <img src={l2ImageSrc} alt={l2ImageAlt} /> : null}
      />

      {/* Layout 3 */}
      <SplitPanel
        ref={layout3Ref}
        left={<p>{l3LeftText}</p>}
        right={l3ImageSrc ? <img src={l3ImageSrc} alt={l3ImageAlt} /> : null}
      />
    </ScrollSection>
  );
};

export default Sectionelf;