import { Physics } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Dice, { type DiceHandle } from "./Dice";
import Walls from "./Walls";
import Board from "./Board";
import { useRef, useState } from "react";
import { DICE_POSITION } from "../constants/dice";
import { Pawn } from "./Pawn";
import { BOARD_PATH } from "../constants/board";

useGLTF.preload("/assets/plane.glb");
useGLTF.preload("/assets/dice_rounded_white.glb");

export default function Scene() {
  const diceRefs = useRef<(DiceHandle | null)[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const movePawn = async (moveCount: number) => {
    setIsMoving(true);

    let nextIndex = currentIndex;

    for (let i = 0; i < moveCount; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          nextIndex = (nextIndex + 1) % BOARD_PATH.length;
          
          setCurrentIndex(nextIndex)

          resolve(true);
        }, 300);
      });
    }

    setIsMoving(false);

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: "PAWN_MOVED",
        index: nextIndex,
      })
    );
  }

  const rollDices = async () => {
    if (isMoving) return;

    const dices = diceRefs.current.filter(Boolean);

    const isAllReady = dices.every(
      (dice) => dice && !dice.isMoving()
    );

    if (!isAllReady) return;

    const result = await Promise.all(
      dices.map((dice) => dice!.roll())
    );

    const total = result.reduce((acc, cur) => acc + cur, 0);

    setResult(total);
    movePawn(total);
  };

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [40, 50, 40], fov: 40 }}>
        <ambientLight color={"#FFFFFF"} intensity={0.5} />

        <directionalLight
          color={"#FFFFFF"}
          intensity={3}
          position={[0, 5, 0]}
        />

        <Physics gravity={[0, -40, 0]}>
          {DICE_POSITION.map((pos, i) => (
            <Dice
              key={i}
              ref={(ref) => { diceRefs.current[i] = ref }}
              position={pos}
            />
          ))}
          <Pawn position={[BOARD_PATH[currentIndex || 0][0], 0, BOARD_PATH[currentIndex || 0][2]]} />
          <Walls />
          <Board />
        </Physics>

        <OrbitControls />
      </Canvas>

      <div className="absolute bottom-10 w-full flex flex-row justify-center items-center gap-10">
        <button
          className="cursor-pointer font-bold text-[40px]"
          onClick={rollDices}
          disabled={isMoving}
        >
          ROLL
        </button>

        <div className="text-[20px] font-bold">
          결과 : {result}
        </div>

        <div className="text-[20px] font-bold">
          현재 칸 : {currentIndex}
        </div>
      </div>
    </div>
  );
}
