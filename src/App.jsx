// Copyright (C) king.com Ltd 2023
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Experience from "./Experience";

function App() {
  const map = useMemo(
    () => [
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "back", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
      { name: "shift", keys: ["ShiftLeft"] },
    ],
    []
  );

  return (
    <Canvas
      shadows
      camera={{
        fov: 60,
        near: 0.1,
        far: 200,
        position: [0, 20, 20],
      }}
    >
      <KeyboardControls map={map}>
        <Perf position="top-left" />
        <OrbitControls makeDefault />
        <Experience />
      </KeyboardControls>
    </Canvas>
  );
}

export default App;
