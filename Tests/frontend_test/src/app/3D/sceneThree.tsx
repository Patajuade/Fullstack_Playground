"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const Light = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1} />
    </>
  );
};

export const Human3D = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const [isDragging, setIsDragging] = useState(false);
  const groupRef = useRef();

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    groupRef.current.rotation.y += e.movementX / 100;
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      onPointerMove={handleMouseMove}
      onClick={(event) => {
        console.log(event);
      }}
    >
      <mesh position={[0, -2.5, 0]}>
        <primitive object={obj} scale={3} />
      </mesh>
    </group>
  );
};

export const SceneThree = () => {
  return (
    <Canvas>
      <Light />
      <Human3D />
    </Canvas>
  );
};
