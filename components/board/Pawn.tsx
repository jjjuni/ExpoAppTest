import { animated, useSpring } from "@react-spring/three";

import { boardPositions } from "../../constants/board";
import { useGameStore } from "../../store/useBoardStore";

export function Pawn() {
  const currentIndex = useGameStore(
    (state) => state.currentIndex
  );

  const target = boardPositions[currentIndex];

  const { position } = useSpring({
    position: [target[0], 0.7, target[2]],
  });

  return (
    <animated.mesh position={position}>
      <sphereGeometry args={[0.4]} />
      <meshStandardMaterial color="red" />
    </animated.mesh>
  );
}