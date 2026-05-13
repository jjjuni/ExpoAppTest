import { Edges, Text, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type Dispatch, type SetStateAction } from "react";
import * as THREE from "three";
import { TILE_SIZE } from "../constants/board";

export default function BoardTile({
  title,
  imageUrl,
  position,
  rotation,
  index,
  hovered,
  setHoveredIndex,
}: {
  title: string;
  imageUrl: string;
  position: [number, number, number];
  rotation: number;
  index: number;
  hovered: boolean;
  setHoveredIndex: Dispatch<
    SetStateAction<number | null>
  >;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetScale = hovered ? 1.25 : 1;

    meshRef.current.scale.lerp(
      new THREE.Vector3(
        targetScale,
        1,
        targetScale
      ),
      0.15
    );

    const targetY = hovered
      ? position[1] + 0.1
      : position[1];

    meshRef.current.position.y =
      THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        0.15
      );
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        rotation={[0, rotation, 0]}
        renderOrder={hovered ? 100 : 0}
        onPointerMove={(e) => {
          e.stopPropagation();

          setHoveredIndex(index);
        }}
        onPointerLeave={() => {
          setHoveredIndex((prev) =>
            prev === index ? null : prev
          );
        }}
      >
        <boxGeometry
          args={[TILE_SIZE, 0.1, TILE_SIZE]}
        />

        <meshStandardMaterial
          map={texture}
        />

        <Edges
          scale={1.001}
          threshold={15}
          color="black"
        />
        <Text
          position={([0, 0.3, 0])}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.8}
          fontWeight={700}
          color={"white"}
          anchorX="center"
          anchorY="middle">
          {title}
        </Text>
      </mesh>
    </group>
  );
}