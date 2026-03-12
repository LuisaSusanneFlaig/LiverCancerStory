import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Model as Metastasen } from "@/components/Metastasen.jsx";
import { useLanguage } from "../Context/LanguageContext";

const METASTASEN_TOOLTIP = {
  anchor: [0.18, 0.05, 0.04],
  label: [75, 25, 0.26],
};

const MetastasenTooltip = ({ isMobile, isTablet, text }) => {
  const textSize = isMobile ? "14px" : isTablet ? "16px" : "18px";
  return (
    <group>
      <mesh position={METASTASEN_TOOLTIP.anchor}>
        <sphereGeometry args={[0.01, 12, 12]} />
        <meshStandardMaterial color="#f8fafc" emissive="#ffffff" emissiveIntensity={0.35} depthTest={false} />
      </mesh>

      <Line points={[METASTASEN_TOOLTIP.anchor, METASTASEN_TOOLTIP.label]} color="#f8fafc" lineWidth={2} depthTest={false} />

      <Html position={METASTASEN_TOOLTIP.label} sprite center>
        <div
          style={{
            background: "rgba(8, 15, 30, 0.82)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "8px",
            padding: "8px 12px",
            lineHeight: "1.25",
            fontSize: textSize,
            width: isMobile ? "190px" : isTablet ? "240px" : "280px",
            maxWidth: "280px",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
};

const RotatingMetastasen = ({ isMobile, isTablet, text }) => {
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.003;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.012 : isTablet ? 0.016 : 0.02}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <Metastasen />
      <MetastasenTooltip isMobile={isMobile} isTablet={isTablet} text={text} />
    </group>
  );
};

const ModelMetastasen = ({ controlsEnabled = true }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { lang } = useLanguage();
  const metastasenText =
    lang === "en"
      ? "In liver cancer, abnormal growth of cells in the liver forms tumors."
      : "Bei Leberkrebs bildet das abnorme Wachstum von Zellen in der Leber Tumore.";
  return (
    <Canvas camera={{ position: [0, 1, 1], fov: 50 }}>
      <ambientLight intensity={10} color="#1a1a40"/>
       {/* Key light */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={2}
  />

  {/* Fill light (opposite side) */}
  <directionalLight
    position={[-5, -5, -5]}
    intensity={2}
  />
      <OrbitControls
        enabled={controlsEnabled}
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
      />
      <RotatingMetastasen isMobile={isMobile} isTablet={isTablet} text={metastasenText} />
    </Canvas>
  )
}   

export default ModelMetastasen;
