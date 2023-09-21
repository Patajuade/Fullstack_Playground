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
    const zoomSpeed = 0.001; // Ajustez la vitesse de zoom selon vos besoins
    groupRef.current.scale.x += e.deltaY * zoomSpeed;
    groupRef.current.scale.y += e.deltaY * zoomSpeed;
    groupRef.current.scale.z += e.deltaY * zoomSpeed;
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
