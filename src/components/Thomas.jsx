import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import CenterPanel from "./Layout/CenterPanel.jsx";
import { getAsset } from "../../constants/themeAssets";// ✅ NEW

gsap.registerPlugin(ScrollTrigger);

const Thomas = ({
  theme = "blue", // ✅ NEW
  heading,
  body,

  // Panel 2 stays unchanged
  panel2Variant = "image",
  panel2Text,
  panel2ImageSrc,
  panel2ImageAlt = "",
}) => {
  const triggerRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      tl.to(panel1Ref.current, {
        opacity: 0,
        x: -100,
        duration: 1,
      });

      tl.fromTo(
        panel2Ref.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1 }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line"); // ✅ only this is theme-based

  return (
    <ScrollSection id="thomas" ref={triggerRef}>
      {/* PANEL 1 */}
      <SplitPanel
        ref={panel1Ref}
        left={
          <h2>
            {heading}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={<p>{body}</p>}
      />

      {/* PANEL 2 */}
      {panel2Variant === "image" ? (
        <CenterPanel ref={panel2Ref}>
          <img src={panel2ImageSrc} alt={panel2ImageAlt} />
        </CenterPanel>
      ) : (
        <SplitPanel
          ref={panel2Ref}
          left={<p>{panel2Text}</p>}
          right={<img src={panel2ImageSrc} alt={panel2ImageAlt} />}
        />
      )}
    </ScrollSection>
  );
};

export default Thomas;