"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const angleToRadians = (angle: number) => (angle * Math.PI) / 180;

const OrbitControl = () => {
  const orbitControlsRef = useRef(null);
  useFrame((state) => {
    if (!orbitControlsRef.current) return;
    const { x, y } = state.mouse;
    orbitControlsRef.current.setAzimuthalAngle(x * angleToRadians(45));
    orbitControlsRef.current.setPolarAngle((-y + 1) * angleToRadians(90 - 30));
    orbitControlsRef.current.update();
  });
  return <OrbitControls ref={orbitControlsRef} position={[0, 5, 10]} />;
};

export const SceneThree = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas>
        <Suspense>
          <PerspectiveCamera makeDefault position={[0, 2.5, 10]} />
          <OrbitControl />
          <ambientLight intensity={0.2} />
          <directionalLight position={[0, 0, 5]} />
          <mesh position={[0, -2.5, 0]}>
            <primitive
              object={obj}
              scale={3}
              onClick={(event) => {
                console.log(event);
              }}
            />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};
