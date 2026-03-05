import ModelMetastasen from "./Models/ModelMetastasen";
import { getAsset } from "../../constants/themeAssets";

const Sectionsieben = ({ theme = "blue" }) => {
  const interactionSrc = getAsset(theme, "interaction");

  return (
    <section id="sectionsieben" className="relative overflow-hidden">
      <div className="hero-3d-layout relative">
        <img
          src={interactionSrc}
          alt="Interaction icon"
          className="pointer-events-none absolute top-4 left-1/2 z-20 w-16 -translate-x-1/2 md:w-20 lg:w-24"
        />
        <ModelMetastasen />
      </div>
    </section>
  );
};

export default Sectionsieben;
