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
    const minZoom = 0.5; // Limite minimale de zoom
    const maxZoom = 2.0; // Limite maximale de zoom

    // Obtenir la position du pointeur par rapport au modèle
    const pointerPosition = e.point.clone();

    // Effectuer le zoom en fonction de la position du pointeur
    const zoomFactor = 1 + e.deltaY * zoomSpeed;

    // Ajuster l'échelle du modèle tout en maintenant les limites
    const newScale = groupRef.current.scale.clone().multiplyScalar(zoomFactor);
    if (newScale.x >= minZoom && newScale.x <= maxZoom) {
      groupRef.current.scale.copy(newScale);
    }

    // Ajuster la position du modèle pour maintenir le centre fixe
    const currentModelPosition = groupRef.current.position.clone();
    const newModelPosition = pointerPosition
      .clone()
      .sub(currentModelPosition)
      .multiplyScalar(zoomFactor);
    groupRef.current.position.copy(
      pointerPosition.clone().sub(newModelPosition)
    );
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
    </Canvas>
  );
};
