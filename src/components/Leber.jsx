import React from "react";
import ModelLeber from "./Models/ModelLeber";
import { getAsset } from "../../constants/themeAssets";// Pfad ggf. anpassen

const Leber = ({ heading, theme = "blue" }) => {
  const lineSrc = getAsset(theme, "line");

  return (
    <section id="leber" className="relative h-screen overflow-hidden">
      <div className="flex flex-col gap-7 p-20">
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
        <ModelLeber />
      </div>
    </section>
  );
};

export default Leber;