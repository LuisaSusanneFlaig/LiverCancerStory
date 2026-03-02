import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import { getAsset } from "../../constants/themeAssets";

gsap.registerPlugin(ScrollTrigger);

const Sectionzehn = ({
  theme = "blue", // ✅ NEW

  heading,

  l1Text,
  l1ImageKey, // ✅ NEW (theme-based) e.g. "behandlung"
  l1ImageAlt = "",

  l2LeftText,
  l2RightText,

  l3LeftText,
  l3ImageSrc,
  l3ImageAlt = "",
  l3Order = "textFirst",
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
  const l1ImgSrc = l1ImageKey ? getAsset(theme, l1ImageKey) : undefined;

  return (
    <ScrollSection id="sectionzehn" ref={containerRef}>
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
            <p>{l1Text}</p>
            {l1ImgSrc ? <img src={l1ImgSrc} alt={l1ImageAlt} /> : null}
          </>
        }
      />

      {/* Layout 2 */}
      <SplitPanel
        ref={layout2Ref}
        left={<p>{l2LeftText}</p>}
        right={<p>{l2RightText}</p>}
      />

      {/* Layout 3 (unchanged image logic) */}
      <SplitPanel
        ref={layout3Ref}
        left={
          l3Order === "imageFirst" ? (
            <img src={l3ImageSrc} alt={l3ImageAlt} />
          ) : (
            <p>{l3LeftText}</p>
          )
        }
        right={
          l3Order === "imageFirst" ? (
            <p>{l3LeftText}</p>
          ) : (
            <img src={l3ImageSrc} alt={l3ImageAlt} />
          )
        }
      />
    </ScrollSection>
  );
};

export default Sectionzehn;