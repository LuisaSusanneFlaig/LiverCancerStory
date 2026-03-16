import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Model as Leberneu } from "@/components/Leberneu";

const RotatingLeber = ({ isMobile, isTablet, shouldRotate }) => {
  const groupRef = useRef(null);

  useFrame(() => {
    if (shouldRotate && groupRef.current) groupRef.current.rotation.y += 0.003;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.012 : isTablet ? 0.016 : 0.02}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      <Leberneu />
    </group>
  );
};

const ModelLeber = ({ controlsEnabled = true }) => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
<Canvas camera={{ position: [1, 1, 6], fov: 50 }}>
  {/* Soft base light */}
  <ambientLight intensity={0.6} color="#1a1a40" />

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
    minPolarAngle={Math.PI / 3.2}
    maxPolarAngle={Math.PI / 1.85}
    minAzimuthAngle={-Math.PI / 3}
    maxAzimuthAngle={Math.PI / 3}
  />

  <RotatingLeber
    isMobile={isMobile}
    isTablet={isTablet}
    shouldRotate={controlsEnabled}
  />
</Canvas>

  )
}   

export default ModelLeber;
