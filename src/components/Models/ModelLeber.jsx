import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Model as Leberneu } from "/src/components/Leberneu";

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

  <OrbitControls
    enablePan={false}
    enableZoom={false}
    maxDistance={20}
    minDistance={5}
  />

  <group
    scale={isMobile ? 0.005 : 0.02}
    position={[0, 0, 0]}
    rotation={[0, -Math.PI / 4, 0]}
  >
    <Leberneu />
  </group>
</Canvas>

  )
}   

export default ModelLeber;