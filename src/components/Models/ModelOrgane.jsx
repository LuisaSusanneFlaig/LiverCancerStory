import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { Model as Ananeu } from "@/components/Ananeu.jsx";

const ModelOrgane = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Canvas camera={{ position: [0, 1, 1], fov: 50 }}>

         <Html position={[0, 0.5, 0]} center>
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            lineHeight: "1.2",
            fontSize: isMobile ? "12px" : "14px",
            width: isMobile ? "150px" : isTablet ? "180px" : "220px",
            maxWidth: "220px",
            textAlign: "center",
          }}
        >
          Zahlreiche Blutgefäße versorgen und entwässern die Leber.
        </div>
      </Html>
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
      enablePan={false}
      enableZoom={false}
      maxDistance={20}
      minDistance={5}
      />
      <group
      scale={isMobile? 0.005 : 0.02}
      position={[0, 0, 0 ]}
      rotation={[0, -Math.PI/4, 0]}>
      <Ananeu />
      </group>
    </Canvas>
  )
}   

export default ModelOrgane;