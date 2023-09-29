"use client";
import { Html, OrbitControls } from "@react-three/drei";
import {
  GroupProps,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Intersection } from "three/src/core/Raycaster";

export const Human3D = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const groupRef = useRef<GroupProps>();

  return (
    <group ref={groupRef}>
      <mesh position={[0, -2.5, 0]}>
        <primitive
          object={obj}
          scale={3}
          onClick={(event: any) => {
            const intersections: Intersection[] = event.intersections;
            const element = intersections[0].object;
            console.log(element.material.color.getHexString());
            if (element.material.color.getHexString() === "ff0000") {
              element.material.color.set("#ffffff");
              return;
            }
            element.material.color.set("#ff0000");
          }}
        />
      </mesh>
    </group>
  );
};

export const SceneThree = () => {
  const humanRef = useRef();
  const lightRef = useRef();
  const orbitControlsRef = useRef();
  const { camera, gl } = useThree();

  const resetCamera = (event: KeyboardEvent) => {
    if (event.key === "r") {
      camera.position.set(0, 0, 5);
      orbitControlsRef.current.thetaDelta = 0;
      orbitControlsRef.current.phiDelta = 0;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", resetCamera);
  });

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <>
      <OrbitControls makeDefault ref={orbitControlsRef} />
      <directionalLight ref={lightRef} intensity={1} position={[0, 0, 10]} />
      <ambientLight intensity={0.1} />
      <mesh ref={humanRef}>
        <Human3D />
      </mesh>
    </>
  );
};
