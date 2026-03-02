import React from "react";
import SplitPanel from "./Layout/SplitPanel.jsx";

const Sectionsechs = ({ leftText, rightText }) => {
  return (
    <section
      id="sectionsechs"
      className="relative h-screen overflow-hidden"
    >
      <SplitPanel
        left={
          <p>
            {leftText}
          </p>
        }
        right={
          <p>
            {rightText}
          </p>
        }
      />
    </section>
  );
};

export default Sectionsechs;