// components/AQICharacter.jsx
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/character.glb"); // Make sure file exists in /public
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export default function AQICharacter({ aqiValue }) {
  return (
    <div style={{ width: 200, height: 200 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
