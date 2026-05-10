import { boardPositions } from "../../constants/board";

export function Board() {
  return (
    <>
      {boardPositions.map((pos, index) => (
        <mesh key={index} position={pos}>
          <boxGeometry args={[1.8, 0.3, 1.8]} />
          <meshStandardMaterial color="#dddddd" />
        </mesh>
      ))}
    </>
  );
}