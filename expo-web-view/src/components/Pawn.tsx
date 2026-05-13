import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type PawnProps = {
  position: [number, number, number];
}

export function Pawn({
  position
}: PawnProps) {
  const { scene } = useGLTF('/assets/plane.glb');

  const meshRef = useRef<THREE.Group>(null);

  const targetPosition = useRef(
    new THREE.Vector3(...position)
  );

  useEffect(() => {
    targetPosition.current.set(
      position[0],
      position[1],
      position[2]
    );
  }, [position]);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.position.lerp(
      targetPosition.current,
      0.1
    );
  });

  return (
    <group ref={meshRef}>
      <primitive
        object={scene.clone()}
        scale={10}
      />
    </group>
  );
}