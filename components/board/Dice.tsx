import { RoundedBox } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import { Asset } from "expo-asset";
import { useMemo, useRef } from "react";

import * as THREE from "three";

import { useGameStore } from "../../store/useBoardStore";
import { diceRotations } from "@/constants/dice";

export function Dice() {
  const groupRef = useRef<THREE.Group>(null);

  const {rolling, diceValue} = useGameStore();

  useFrame(() => {
  if (!groupRef.current) return;

  if (rolling) {
    groupRef.current.rotation.x += 0.2;
    groupRef.current.rotation.y += 0.2;
    groupRef.current.rotation.z += 0.2;
  } else {
    const target =
      diceRotations[
        diceValue as keyof typeof diceRotations
      ];

    groupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        target[0],
        0.1
      );

    groupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        target[1],
        0.1
      );

    groupRef.current.rotation.z =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        target[2],
        0.1
      );
  }
});

  const textures = useMemo(() => {
    const images = [
      require("../../assets/images/dice/1.png"),
      require("../../assets/images/dice/2.png"),
      require("../../assets/images/dice/3.png"),
      require("../../assets/images/dice/4.png"),
      require("../../assets/images/dice/5.png"),
      require("../../assets/images/dice/6.png"),
    ];

    return images.map((img) => {
      const asset = Asset.fromModule(img);

      const texture =
        new THREE.TextureLoader().load(
          asset.uri
        );

      texture.flipY = false;

      return texture;
    });
  }, []);

  return (
    <group
      ref={groupRef}
      position={[0, 5, 0]}
    >
      {/* 주사위 본체 */}
      <RoundedBox
        args={[2, 2, 2]}
        radius={0.12}
        smoothness={4}
      >
        <meshStandardMaterial color="white" />
      </RoundedBox>

      {/* 앞면 */}
      <mesh position={[0, 0, 1.02]}>
        <planeGeometry args={[2, 2]} />

        <meshBasicMaterial
          map={textures[0]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 뒷면 */}
      <mesh
        position={[0, 0, -1.02]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[2, 2]} />

        <meshBasicMaterial
          map={textures[5]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 오른쪽 */}
      <mesh
        position={[1.02, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[2, 2]} />

        <meshBasicMaterial
          map={textures[2]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 왼쪽 */}
      <mesh
        position={[-1.02, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[2, 2]} />

        <meshBasicMaterial
          map={textures[3]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 위 */}
      <mesh
        position={[0, 1.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2, 2]} />

        <meshBasicMaterial
          map={textures[4]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 아래 */}
      <mesh
        position={[0, -1.02, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2, 2]} />

        <meshBasicMaterial
          map={textures[1]}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}