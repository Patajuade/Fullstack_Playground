"use client";
import { useEffect, useState } from "react";
import { SceneThree } from "./sceneThree";
import { Canvas } from "@react-three/fiber";

export default async function Page() {
  return (
    <div id="canvas-container">
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Canvas>
          <SceneThree />
        </Canvas>
      </div>
    </div>
  );
}
