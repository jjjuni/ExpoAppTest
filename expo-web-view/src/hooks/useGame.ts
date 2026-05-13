import { useRef, useState } from "react";

import type { DiceHandle } from "../components/Dice";

import { BOARD_PATH } from "../constants/board";

export function useGame() {
  const diceRefs = useRef<(DiceHandle | null)[]>([]);

  const [result, setResult] =
    useState<number | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMoving, setIsMoving] =
    useState(false);

  const movePawn = async (
    moveCount: number
  ) => {
    setIsMoving(true);

    let nextIndex = currentIndex;

    for (let i = 0; i < moveCount; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          nextIndex =
            (nextIndex + 1) %
            BOARD_PATH.length;

          setCurrentIndex(nextIndex);

          resolve(true);
        }, 300);
      });
    }

    setIsMoving(false);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "PAWN_MOVED",
        index: currentIndex,
      })
    );
  };

  const rollDices = async () => {
    if (isMoving) return;

    const dices =
      diceRefs.current.filter(Boolean);

    const isAllReady = dices.every(
      (dice) => dice && !dice.isMoving()
    );

    if (!isAllReady) return;

    const result = await Promise.all(
      dices.map((dice) => dice!.roll())
    );

    const total = result.reduce(
      (acc, cur) => acc + cur,
      0
    );

    setResult(total);

    movePawn(total);
  };

  return {
    diceRefs,

    result,
    currentIndex,
    isMoving,

    rollDices,
  };
}