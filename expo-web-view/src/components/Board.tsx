import { usePlane } from "@react-three/cannon";
import { Edges } from "@react-three/drei";
import { BOARD_PATH, TILE_SIZE } from "../constants/board";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";

function Tile({
  position,
  index,
  hovered,
  setHoveredIndex,
}: {
  position: [number, number, number];
  index: number;

  hovered: boolean;

  setHoveredIndex: Dispatch<
    SetStateAction<number | null>
  >;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetScale = hovered ? 1.2 : 1;

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
    <mesh
      ref={meshRef}
      position={position}
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
        color={
          hovered
            ? "#ffd54f"
            : "#ffffff"
        }
      />

      <Edges
        scale={1.001}
        threshold={15}
        color="black"
      />
    </mesh>
  );
}

export default function Board() {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0] as [number, number, number],
    rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
    type: "Static", // 고정
    material: {
      restitution: 0.5, // 반발력 (1 이상이면 충돌 시 더 튕김)
    },
  }));

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {/* 가운데 바닥 */}
      <mesh ref={ref}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color={"#9c9c9c"}
          transparent
          opacity={1}
        />
      </mesh>

      {/* 타일 */}
      {BOARD_PATH.map((position, index) => (
        <Tile
          key={index}
          position={position}
          index={index}
          hovered={hoveredIndex === index}
          setHoveredIndex={setHoveredIndex} />
      ))}

    </>
  );
}