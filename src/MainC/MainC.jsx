// Copyright (C) king.com Ltd 2023
import React, { useState, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { controlObj } from "../utils/ControlObj";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const MainC = () => {
  const boxRef = useRef();
  const meshRef = useRef();
  const [isJumping, setIsJumping] = useState(false);

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const eventHandler = (event) => {
    meshRef.current.material.color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
    boxRef.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
  };
  const jump = () => {
    if (isJumping) {
      return;
    }
    boxRef.current.applyImpulse({ x: 0, y: 3, z: 0 });
    setIsJumping(true);
  };

  useFrame((state, delta) => {
    /**
     * Camera
     */
    const bodyPosition = boxRef.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.x += 7.25;
    cameraPosition.y += 3.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);

    // controls
    const controlledObj = boxRef.current;
    controlObj(controlledObj, get, jump);
  });
  const [sub, get] = useKeyboardControls();

  return (
    <RigidBody
      colliders="ball"
      ref={boxRef}
      onCollisionEnter={({ manifold, target, other }) => {
        setIsJumping(false);
      }}
      position={[75, 25, 50]}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      restitution={0.2}
    >
      <mesh
        castShadow
        receiveShadow
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
        ref={meshRef}
        onClick={eventHandler}
        colliders={false}
      >
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};
