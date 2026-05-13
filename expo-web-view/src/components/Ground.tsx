import { usePlane } from "@react-three/cannon";

export default function Ground() {
  const [ref] = usePlane(() => ({
    position: [0, 0, 0] as [number, number, number],
    rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
    type: "Static", // 고정
    material: {
      restitution: 0.5, // 반발력 (1 이상이면 충돌 시 더 튕김)
    },
  }));

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
    </>
  );
}