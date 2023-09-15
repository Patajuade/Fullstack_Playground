"use client";

import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const Human3D = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const directionalLightRef = useRef();
  const backlightref = useRef();
  const cameraRef = useRef();

  return (
    <group>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2.5, 10]} />
      <OrbitControls enableRotate={true} enableZoom={true} enablePan={true} />
      <ambientLight intensity={0.2} />
      <mesh position={[0, -2.5, 0]}>
        <primitive
          object={obj}
          scale={3}
          onClick={(event: Event) => {
            console.log(event);
          }}
        />
      </mesh>
    </group>
  );
};

export const SceneThree = () => {
  return (
    <Canvas>
      <Suspense>
        <directionalLight position={[0, 2.5, 10]} />
        <directionalLight
          intensity={1.5}
          position={[0, 2.5, -300]}
          rotateY={180}
        />
        <Human3D />
      </Suspense>
    </Canvas>
  );
};
