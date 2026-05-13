import {
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

import { Canvas } from "@react-three/fiber";

import GameBoard from "./GameBoard";
import GameUI from "./GameUI";

import { useGame } from "../hooks/useGame";
import { useBoardStore } from "../store/useBoardStore";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";

useGLTF.preload("/assets/plane.glb");

useGLTF.preload(
  "/assets/dice_rounded_white.glb"
);

export default function Scene() {
  const {
    diceRefs,

    result,
    currentIndex,
    isMoving,

    rollDices,
  } = useGame();

  const { isLoading } = useBoardStore();

  return (
    <>
      <AnimatePresence>
        {isLoading &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-screen h-screen fixed top-0 flex justify-center items-center transition-all duration-300`}>
            <ClipLoader color="#777777" size={40} />
          </motion.div>
        }
      </AnimatePresence>

      <div className={`w-screen h-screen transition-all duration-300 ${isLoading ? `opacity-0` : `opacity-100`}`}>
        <Canvas
          camera={{
            position: [40, 50, 40],
            fov: 40,
          }}
        >
          <ambientLight intensity={0.5} />

          <directionalLight
            intensity={3}
            position={[0, 5, 0]}
          />

          <GameBoard
            diceRefs={diceRefs}
            currentIndex={currentIndex}
          />

          <OrbitControls />
        </Canvas>

        <GameUI
          result={result}
          currentIndex={currentIndex}
          isMoving={isMoving}
          rollDices={rollDices}
        />
      </div>
    </>
  );
}