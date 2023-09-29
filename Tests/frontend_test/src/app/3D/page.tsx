"use client";
import { useEffect, useState } from "react";
import { AddHealthProblem, SceneThree } from "./sceneThree";
import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.css";

export default function Page() {
  // const [bodyPart, setBodyPart] = useState<string>("");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <Canvas>
            <SceneThree />
          </Canvas>
        </div>
        <div className={styles.infoContainer}>
          {/* <AddHealthProblem bodyPart={bodyPart} /> */}
        </div>
      </div>
    </>
  );
}
