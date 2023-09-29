"use client";
import { useEffect, useState } from "react";
import { SceneThree } from "./sceneThree";
import { Canvas } from "@react-three/fiber";

export default async function Page() {
  return (
    <div id="canvas-container">
      <div
        style={{
          height: "50vh",
          width: "50vw",
        }}
      >
        <Canvas>
          <SceneThree />
        </Canvas>
      </div>
    </div>
  );
}
