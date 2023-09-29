"use client";
import { OrbitControls } from "@react-three/drei";
import { GroupProps, useFrame, useLoader, useThree } from "@react-three/fiber";
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

interface SceneThreeProps {
  setBodyPart: (bodyPart: string) => void;
}

export const Human3D = ({ setBodyPart }: Human3DProps) => {
  const obj = useLoader(OBJLoader, "/assets/3D/human_base_meshes_bundle.obj");
  const groupRef = useRef<GroupProps>();
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);

  const handleClick = (event: any) => {
    setBodyPart(event.intersections[0].object.name);
    const intersections: Intersection[] = event.intersections;
    const element = intersections[0].object;
    const clickedPart = event.intersections[0].object.name;

    // Si la partie du corps est déjà sélectionnée, on la déselectionne
    if (selectedBodyParts.includes(clickedPart)) {
      setSelectedBodyParts((prevSelectedParts) =>
        prevSelectedParts.filter((part) => part !== clickedPart)
      );
      setBodyPart("");
      // Sinon, on ajoute la partie du corps au tableau des parties sélectionnées
    } else {
      setSelectedBodyParts((prevSelectedParts) => [
        ...prevSelectedParts,
        clickedPart,
      ]);
      setBodyPart(clickedPart);
    }

    if (element.material.color.getHexString() === "ff0000") {
      element.material.color.set("#ffffff");
      return;
    }
    element.material.color.set("#ff0000");
    console.log(selectedBodyParts);
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
    <>
      <input />
      <div>{bodyPart}</div>
    </>
  );
};

export const SceneThree = ({ setBodyPart }: SceneThreeProps) => {
  const humanRef = useRef();
  const lightRef = useRef();
  const orbitControlsRef = useRef();
  const { camera } = useThree();

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
      <OrbitControls
        makeDefault
        ref={orbitControlsRef}
        enableDamping={false}
        enablePan={false}
      />
      <directionalLight ref={lightRef} intensity={1} position={[0, 0, 10]} />
      <ambientLight intensity={0.1} />
      <mesh ref={humanRef}>
        <Human3D setBodyPart={setBodyPart} />
      </mesh>
    </>
  );
};
