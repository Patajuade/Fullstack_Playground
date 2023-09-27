"use client";
import {
  GroupProps,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { log } from "console";

extend({ OrbitControls });

export const Light = ({ lightRef }) => {
  return <></>;
};

export const Human3D = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const groupRef = useRef<GroupProps>();
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef([0, 0]);

  const handleMouseClickAndDrag = (e) => {
    setIsDragging(true);
    previousMousePosition.current = [e.clientX, e.clientY];
  };

  // const handleMouseMove = (e) => {
  //   if (isDragging) {
  //     const [deltaX, deltaY] = [
  //       e.clientX - previousMousePosition.current[0],
  //       e.clientY - previousMousePosition.current[1],
  //     ];

  //     groupRef.current.rotation.y += deltaX / 100;
  //     groupRef.current.rotation.x += deltaY / 100;

  //     previousMousePosition.current = [e.clientX, e.clientY];
  //   }
  // };

  const handleMouseWheel = (e) => {
    if (!groupRef.current) return;

    const zoomSpeed = 0.001;
    // Obtenir la position du pointeur par rapport au modèle
    const pointerPosition = e.point.clone();

    // Effectuer le zoom en fonction de la position du pointeur
    const zoomFactor = 1 + e.deltaY * zoomSpeed;
    groupRef.current.scale.multiplyScalar(zoomFactor);

    // Ajuster la position du modèle pour maintenir le pointeur au même endroit
    const newModelPosition = pointerPosition
      .clone()
      .multiplyScalar(1 - zoomFactor);
    groupRef.current.position.add(newModelPosition);
  };

  useEffect(() => {
    const handleDocumentMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleDocumentMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, []);

  return (
    <group
      ref={groupRef}
      onPointerDown={handleMouseClickAndDrag}
      onWheel={handleMouseWheel}
    >
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

// plusieurs façons de faire :
// 1
// On peut utiliser orbitControls pour gérer le zoom et la rotation
// Avantage : zoom et rotation fonctionnent très bien
// Désavantage : la lumière reste collée à une face cu modèle
// Solution : éclairer tout le modèle
// 2
// On peut utiliser les fonctions de rotation et de zoom de la souris
// Avantage : la lumière éclaire comme il faut, a le comportement d'un "soleil"
// Désavantage : la rotation est un peu saccadée, ne fonctionne plus quand on sort du mesh, le modèle se fait la malle avec le zoom
// Solution : mieux faire la rotation, le zoom,...
