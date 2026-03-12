import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Model as Leberneu } from "@/components/Leberneu";
import TouchOrbitControls from "./TouchOrbitControls";

const RotatingLeber = ({ isMobile, isTablet }) => {
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
      <Leberneu />
    </group>
  );
};

const ModelLeber = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
<Canvas camera={{ position: [1, 1, 5], fov: 50 }}>
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

  <TouchOrbitControls
    enablePan={false}
    enableZoom={false}
    maxDistance={20}
    minDistance={5}
  />

  <RotatingLeber isMobile={isMobile} isTablet={isTablet} />
</Canvas>

  )
}   

export default ModelLeber;
