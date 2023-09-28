"use client";
import {
  GroupProps,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

extend({ OrbitControls });

export const Human3D = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const groupRef = useRef<GroupProps>();
  return (
    <group ref={groupRef}>
      <mesh position={[0, -2.5, 0]}>
        <primitive object={obj} scale={3} />
      </mesh>
    </group>
  );
};

export const SceneThree = () => {
  const humanRef = useRef();
  const lightRef = useRef();
  const { camera, gl } = useThree();
  console.log(camera);
  console.log(gl);

  useFrame((state, delta) => {
    //delta est le temps écoulé depuis la dernière frame
    //on utilise delta pour faire tourner le modèle à la même vitesse sur tous les ordinateurs
    //humanRef.current.rotation.y += delta;
    if (lightRef.current) {
      lightRef.current.position.copy(camera.position);
    }
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight ref={lightRef} intensity={1} position={[0, 0, 10]} />
      <mesh ref={humanRef}>
        <Human3D />
      </mesh>
    </>
  );
};
