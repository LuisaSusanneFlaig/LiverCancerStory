import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import CenterPanel from "./Layout/CenterPanel.jsx";
import { getAsset } from "../../constants/themeAssets";

gsap.registerPlugin(ScrollTrigger);

const Deutschland = ({
  theme = "blue", // ✅ NEW

  p1Left,
  p1Right,
  p2Left,

  // ✅ theme-based image key
  p2ImageKey, // e.g. "ratio"
  p2ImageAlt = "",

  p3Text,
}) => {
  const containerRef = useRef(null);
  const panel1 = useRef(null);
  const panel2 = useRef(null);
  const panel3 = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([panel2.current, panel3.current], { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(panel1.current, { x: -100, opacity: 0, duration: 1 });

      tl.fromTo(
        panel2.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1 }
      );

      tl.to(panel2.current, { x: -100, opacity: 0, duration: 1 });

      tl.fromTo(
        panel3.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const p2ImgSrc = p2ImageKey ? getAsset(theme, p2ImageKey) : undefined;

  return (
    <ScrollSection id="deutschland" ref={containerRef}>
      {/* PANEL 1 */}
      <SplitPanel ref={panel1} left={<p>{p1Left}</p>} right={<p>{p1Right}</p>} />

      {/* PANEL 2 */}
      <SplitPanel
        ref={panel2}
        left={<p>{p2Left}</p>}
        right={
          p2ImgSrc ? (
            <img
              src={p2ImgSrc}
              alt={p2ImageAlt}
              className="max-w-full max-h-full"
            />
          ) : null
        }
      />

      {/* PANEL 3 */}
      <CenterPanel ref={panel3}>
        <p>{p3Text}</p>
      </CenterPanel>
    </ScrollSection>
  );
};

export default Deutschland;