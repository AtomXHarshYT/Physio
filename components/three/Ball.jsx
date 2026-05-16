"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";

function Sphere() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={1.5}
    >
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />

        <meshStandardMaterial
          color="#facc15"
          emissive="#facc15"
          emissiveIntensity={1}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function Ball() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">

      <Canvas camera={{ position: [0, 0, 5] }}>

        <ambientLight intensity={1.5} />

        <directionalLight position={[2, 2, 2]} intensity={2} />

        <Sphere />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={1.5}
        />

      </Canvas>

    </div>
  );
}