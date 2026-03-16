import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Model as Ananeu } from "@/components/Ananeu.jsx";
import { useLanguage } from "../Context/LanguageContext";

const ORGANE_TOOLTIPS = [
  {
    id: "heart",
    anchor: [1, 0.8, 0.1],
    label: [2.5, 1.12, 0.26],
    text: { de: "Herz", en: "Heart" },
  },
  {
    id: "liver_vessels",
    anchor: [-0.9, -0.04, 0.08],
    label: [-2.5, 0.42, 0.3],
    text: {
      de: "Zahlreiche Blutgefaesse versorgen und entwaessern die Leber",
      en: "Numerous blood vessels supply and drain the liver",
    },
  },
];

const OrganeTooltips = ({ isMobile, isTablet, lang }) => {
  const textSize = isMobile ? "14px" : isTablet ? "16px" : "18px";
  return (
    <>
      {ORGANE_TOOLTIPS.map((tip) => (
        <group key={tip.id}>
          <mesh position={tip.anchor}>
            <sphereGeometry args={[0.01, 12, 12]} />
            <meshStandardMaterial
              color="#f8fafc"
              emissive="#ffffff"
              emissiveIntensity={0.35}
              depthTest={false}
            />
          </mesh>

          <Line points={[tip.anchor, tip.label]} color="#f8fafc" lineWidth={2} depthTest={false} />

          <Html position={tip.label} sprite center>
            <div
              style={{
                background: "rgba(8, 15, 30, 0.82)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.22)",
                borderRadius: "8px",
                padding: "6px 10px",
                fontSize: textSize,
                lineHeight: "1.25",
                whiteSpace: "normal",
                maxWidth: isMobile ? "150px" : isTablet ? "190px" : "230px",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              {tip.text?.[lang] ?? tip.text?.de ?? ""}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

const RotatingOrgane = ({ isMobile, isTablet, lang, shouldRotate }) => {
  const groupRef = useRef(null);
  const modelScale = isMobile ? 0.012 : isTablet ? 0.016 : 0.02;

  useFrame(() => {
    if (shouldRotate && groupRef.current) groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
      <group scale={modelScale}>
        <Ananeu />
      </group>
      <OrganeTooltips isMobile={isMobile} isTablet={isTablet} lang={lang} />
    </group>
  );
};

const ModelOrgane = ({ controlsEnabled = true }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const { lang } = useLanguage();

  return (
    <Canvas camera={{ position: [0, 1, 6], fov: 50 }}>
      <ambientLight intensity={10} color="#1a1a40" />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, -5]} intensity={2} />
      <OrbitControls
        enabled={controlsEnabled}
        enablePan={false}
        enableZoom={false}
        maxDistance={20}
        minDistance={5}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.85}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
      />
      <RotatingOrgane
        isMobile={isMobile}
        isTablet={isTablet}
        lang={lang}
        shouldRotate={controlsEnabled}
      />
    </Canvas>
  );
};

export default ModelOrgane;
