// Copyright (C) king.com Ltd 2023
import { useGLTF, useHelper } from "@react-three/drei";
import { RigidBody, Physics, CuboidCollider } from "@react-three/rapier";
import { MainC } from "./MainC/MainC";
import * as THREE from "three";
import { useRef } from "react";
import Terrain from "./Terrain/Terrain";
export default function Experience() {
  const hamburger = useGLTF("./hamburger.glb");
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  return (
    <>
      <directionalLight
        /* ref={directionalLight} */
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />
      <Physics>
        {/* <Debug /> */}
        {/* <RigidBody name="Bally McBallFace">
          <mesh castShadow position={[-2, 2, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody> */}
        <RigidBody
          position={[25, 15, 25]}
          colliders="trimesh"
          name="Burgy McBurgFace"
        >
          <primitive object={hamburger.scene} scale={0.25} sw />
        </RigidBody>

        {/* <MainC /> */}
        <Terrain />
      </Physics>
    </>
  );
}
