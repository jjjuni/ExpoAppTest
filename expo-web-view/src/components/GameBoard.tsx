import { Physics } from "@react-three/cannon";

import Dice from "./Dice";
import Walls from "./Walls";
import Ground from "./Ground";
import { Pawn } from "./Pawn";

import { DICE_POSITION } from "../constants/dice";
import { BOARD_PATH } from "../constants/board";

import type { DiceHandle } from "./Dice";
import BoardTiles from "./BoardTiles";

type Props = {
  diceRefs: React.MutableRefObject<
    (DiceHandle | null)[]
  >;

  currentIndex: number;
};

export default function GameBoard({
  diceRefs,
  currentIndex,
}: Props) {
  return (
    <>
      <Physics gravity={[0, -50, 0]}>
        {DICE_POSITION.map((pos, i) => (
          <Dice
            key={i}
            ref={(ref) => {
              diceRefs.current[i] = ref;
            }}
            position={pos}
          />
        ))}

        <Pawn
          position={[
            BOARD_PATH[currentIndex][0],
            0,
            BOARD_PATH[currentIndex][2],
          ]}
        />
        <Ground />
        <Walls />
      </Physics>
      <BoardTiles />
    </>
  );
}