"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export const Light = () => {
  return (
    <>
      <directionalLight intensity={1} position={[0, 0, 10]} />
    </>
  );
};

export const Human3D = () => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const previousMousePosition = useRef([0, 0]);

  const handleMouseClickAndDrag = (e) => {
    setIsDragging(true);
    previousMousePosition.current = [e.clientX, e.clientY];
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const [deltaX, deltaY] = [
        e.clientX - previousMousePosition.current[0],
        e.clientY - previousMousePosition.current[1],
      ];

      groupRef.current.rotation.y += deltaX / 100;
      groupRef.current.rotation.x += deltaY / 100;

      previousMousePosition.current = [e.clientX, e.clientY];
    }
  };

  const handleMouseWheel = (e) => {
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
      onPointerMove={handleMouseMove}
      onWheel={handleMouseWheel}
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
      {/* <OrbitControls /> */}
    </Canvas>
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
// 3
// On pourrait faire la rotation avec des sliders, un à l'horizontale, un à la verticale, et le zoom à la molette ou slider
// Avantage : ce serait probablement moins capricieux
// Désavantage : ce serait moins intuitif, moins "fun"
