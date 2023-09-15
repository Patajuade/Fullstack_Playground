import { useEffect, useState } from "react";
import { SceneThree } from "./sceneThree";

export default async function Page() {
  return (
    <div id="canvas-container">
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <SceneThree />
      </div>
    </div>
  );
}
