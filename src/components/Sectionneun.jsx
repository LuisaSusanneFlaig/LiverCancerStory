import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSection from "./Layout/ScrollSection.jsx";
import SplitPanel from "./Layout/SplitPanel.jsx";
import CenterPanel from "./Layout/CenterPanel.jsx";
import { getAsset } from "../../constants/themeAssets";// ✅ Pfad ggf. anpassen

gsap.registerPlugin(ScrollTrigger);

const Sectionneun = ({
  theme = "blue", // ✅ NEW

  heading,
  introRight,

  // Questions + images (layouts 8,5,6,7) — stay static
  q1Text,
  q1ImageSrc,
  q1ImageAlt = "",

  q2Text,
  q2ImageSrc,
  q2ImageAlt = "",

  q3Text,
  q3ImageSrc,
  q3ImageAlt = "",

  q4Text,
  q4ImageSrc,
  q4ImageAlt = "",

  // Imaging methods (layouts 2,3,4) — theme-based images
  methodsIntro,
  method1ImageKey, // ✅ e.g. "ultraschall"
  method1Label,
  method1Alt = "",

  method2ImageKey, // ✅ e.g. "CT"
  method2Label,
  method2Alt = "",

  method3ImageKey, // ✅ e.g. "MRT"
  method3Label,
  method3Alt = "",
}) => {
  const containerRef = useRef(null);

  const layout1Ref = useRef(null);
  const layout2Ref = useRef(null);
  const layout3Ref = useRef(null);
  const layout4Ref = useRef(null);
  const layout5Ref = useRef(null);
  const layout6Ref = useRef(null);
  const layout7Ref = useRef(null);
  const layout8Ref = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          layout2Ref.current,
          layout3Ref.current,
          layout4Ref.current,
          layout5Ref.current,
          layout6Ref.current,
          layout7Ref.current,
          layout8Ref.current,
        ],
        { opacity: 0 }
      );

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

      tl.fromTo(layout8Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout8Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout2Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout2Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout3Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout3Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout4Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout4Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout5Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout5Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout6Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
      tl.to(layout6Ref.current, { x: -200, opacity: 0, duration: 1 });

      tl.fromTo(layout7Ref.current, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const lineSrc = getAsset(theme, "line");
  const method1Src = method1ImageKey ? getAsset(theme, method1ImageKey) : undefined;
  const method2Src = method2ImageKey ? getAsset(theme, method2ImageKey) : undefined;
  const method3Src = method3ImageKey ? getAsset(theme, method3ImageKey) : undefined;

  return (
    <ScrollSection id="sectionneun" ref={containerRef}>
      {/* Layout 1 */}
      <SplitPanel
        ref={layout1Ref}
        left={
          <h2>
            {heading}
            <img src={lineSrc} alt="Decorative line" className="mt-4 mb-6" />
          </h2>
        }
        right={<p>{introRight}</p>}
      />

      {/* Layout 8 (static image) */}
      <CenterPanel ref={layout8Ref}>
        <p>{q1Text}</p>
        <img src={q1ImageSrc} alt={q1ImageAlt} />
      </CenterPanel>

      {/* Layout 2 (theme image) */}
      <SplitPanel
        ref={layout2Ref}
        className="absolute inset-0 w-full flex pt-50"
        left={<p>{methodsIntro}</p>}
        right={
          <>
            {method1Src ? <img src={method1Src} alt={method1Alt || method1Label} /> : null}
            <p>{method1Label}</p>
          </>
        }
      />

      {/* Layout 3 (theme image) */}
      <CenterPanel ref={layout3Ref}>
        {method2Src ? (
          <img src={method2Src} alt={method2Alt || method2Label} className="max-w" />
        ) : null}
        <p>{method2Label}</p>
      </CenterPanel>

      {/* Layout 4 (theme image) */}
      <CenterPanel ref={layout4Ref}>
        {method3Src ? (
          <img src={method3Src} alt={method3Alt || method3Label} className="max-w" />
        ) : null}
        <p>{method3Label}</p>
      </CenterPanel>

      {/* Layout 5 (static image) */}
      <CenterPanel ref={layout5Ref}>
        <p>{q2Text}</p>
        <img src={q2ImageSrc} alt={q2ImageAlt} />
      </CenterPanel>

      {/* Layout 6 (static image) */}
      <CenterPanel ref={layout6Ref}>
        <p>{q3Text}</p>
        <img src={q3ImageSrc} alt={q3ImageAlt} />
      </CenterPanel>

      {/* Layout 7 (static image) */}
      <CenterPanel ref={layout7Ref}>
        <p>{q4Text}</p>
        <img src={q4ImageSrc} alt={q4ImageAlt} />
      </CenterPanel>
    </ScrollSection>
  );
};

export default Sectionneun;