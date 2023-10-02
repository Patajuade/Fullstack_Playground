"use client";
import { AddHealthProblem, SceneThree } from "./sceneThree";
import { Canvas } from "@react-three/fiber";
import styles from "./styles.module.css";

export default function Page() {
  return (
    <>
      {/* <Human3DProvider> */}
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <Canvas>
            <SceneThree />
          </Canvas>
        </div>
        <div className={styles.infoContainer}>
          <AddHealthProblem />
        </div>
      </div>
      {/* </Human3DProvider> */}
    </>
  );
}
