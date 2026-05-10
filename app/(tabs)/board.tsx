import Dice from '@/components/board/Dice';
import { DiceButton } from '@/components/board/DiceButton';
import Ground from '@/components/board/Ground';
import Scene from '@/components/board/Scene';
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BoardScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DiceButton />

      <Scene>
        <Suspense fallback={null}>
          <Physics gravity={[0, -30, 0]} worker={false}>
            <Dice />
            <Ground />
          </Physics>
        </Suspense>
      </Scene>
    </SafeAreaView>
  );
}