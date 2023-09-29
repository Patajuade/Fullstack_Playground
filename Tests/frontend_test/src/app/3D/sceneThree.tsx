"use client";
import { Html, OrbitControls } from "@react-three/drei";
import {
  GroupProps,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Intersection } from "three/src/core/Raycaster";

//TODO : Faire en sorte que lorsque l'on clique sur une partie du corps, on puisse recliquer dessus pour ajouter un point coloré pour localiser le problème de santé

interface Human3DProps {
  setBodyPart: (bodyPart: string) => void;
}

interface AddHealthProblemProps {
  bodyPart: string;
}

export const Human3D = ({ setBodyPart }: Human3DProps) => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const groupRef = useRef<GroupProps>();

  const handleClick = (event: any) => {
    setBodyPart(event.intersections[0].object.name);
    const intersections: Intersection[] = event.intersections;
    const element = intersections[0].object;
    if (element.material.color.getHexString() === "ff0000") {
      element.material.color.set("#ffffff");
      setBodyPart("");
      return;
    }
    element.material.color.set("#ff0000");
  };

  return (
    <>
      <group ref={groupRef}>
        <mesh position={[0, -2.5, 0]}>
          <primitive
            object={obj}
            scale={3}
            onClick={(event: any) => {
              handleClick(event);
            }}
          />
        </mesh>
      </group>
    </>
  );
};

export const AddHealthProblem = ({ bodyPart }: AddHealthProblemProps) => {
  return (
    <Html>
      <input />
      <div>{bodyPart}</div>
    </Html>
  );
};

export const SceneThree = () => {
  const humanRef = useRef();
  const lightRef = useRef();
  const orbitControlsRef = useRef();
  const { camera, gl } = useThree();
  const [bodyPart, setBodyPart] = useState<string>("");

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
        <Human3D setBodyPart={setBodyPart} />
        <AddHealthProblem bodyPart={bodyPart} />
      </mesh>
    </>
  );
};
