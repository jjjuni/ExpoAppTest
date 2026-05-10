import { Board } from '@/components/board/Board';
import { Dice } from '@/components/board/Dice';
import { DiceButton } from '@/components/board/DiceButton';
import { Pawn } from '@/components/board/Pawn';
import { Canvas } from "@react-three/fiber/native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChattingScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DiceButton />

      <Canvas
        camera={{
          position: [0, 15, 20],
          fov: 50,
        }}
      >
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[10, 10, 5]}
        />

        <Board />
        <Pawn />
        <Dice />
      </Canvas>
    </SafeAreaView>
  );
}