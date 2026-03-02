import React from "react";
import ModelOrgane from "./Models/ModelOrgane";
import { getAsset } from "../../constants/themeAssets"; // Pfad ggf. anpassen

const Organe = ({ heading, theme = "blue" }) => {
  const lineSrc = getAsset(theme, "line");

  return (
    <section id="organe" className="relative h-screen overflow-hidden">
      <div className="flex flex-col gap-7">
        <h2>
          {heading}
          <img
            src={lineSrc}
            alt="Decorative line"
            className="mt-4 mb-6"
          />
        </h2>
      </div>

      <div className="hero-3d-layout">
        <ModelOrgane />
      </div>
    </section>
  );
};

export default Organe;