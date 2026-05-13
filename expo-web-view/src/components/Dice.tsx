import { useGLTF } from "@react-three/drei";
import { useBox } from "@react-three/cannon";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import getDiceTopFace from "../util/getDiceNum";


export interface DiceHandle {
  roll: () => Promise<number>;
  isMoving: () => boolean;
}

const Dice = forwardRef<DiceHandle, { position?: [number, number, number] }>(({ position = [0, 0, 0] }, ref) => {

  const { scene } = useGLTF(`/assets/dice_rounded_white.glb`);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);
  const timerRef = useRef<number>(null);
  const unsubscribeSpeedRef = useRef<() => void | null>(null);

  const [diceRef, api] = useBox(() => {
    return {
      mass: 1,
      position: position as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      args: [2, 2, 2] as [number, number, number],
      collisionFilterGroup: 1,
      collisionFilterMask: -1,
      material: {
        restitution: 0.8,
        friction: 0.9,
      },
    };
  });

  const startDiceMonitor = (onFinish: (result: number) => void) => {
    // 이전 구독 제거
    if (unsubscribeSpeedRef.current) {
      unsubscribeSpeedRef.current();
      unsubscribeSpeedRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const unsubscribeSpeed = api.velocity.subscribe((vel) => {
      const speed = Math.sqrt(vel[0] ** 2 + vel[1] ** 2 + vel[2] ** 2);

      if (speed <= 0.1) {
        setIsMoving(false);
        unsubscribeSpeed();

        const unsubscribeQuat = api.quaternion.subscribe((q) => {
          const faceNum = parseInt(getDiceTopFace(q));
          setResult(faceNum);
          onFinish(faceNum);
          unsubscribeQuat();
        });
      } else {
        setIsMoving(true);
      }
    });

    unsubscribeSpeedRef.current = unsubscribeSpeed;

    // 6초 타임아웃 처리
    timerRef.current = window.setTimeout(() => {
      const unsubscribeQuat = api.quaternion.subscribe((q) => {
        setResult(parseInt(getDiceTopFace(q)));
        unsubscribeQuat();
      });

      unsubscribeSpeed();
    }, 6000);
  };

  useImperativeHandle(ref, () => ({
    roll: () => {
      return new Promise<number>((resolve) => {
        setIsMoving(true);
        setResult(null);

        const handleResult = (res: number) => {
          resolve(res);
        }

        const randomForceX = Math.random() * 4;
        const randomForceY = Math.random() * 4;
        const randomForceZ = Math.random() * 4;

        api.applyImpulse([0, 20, 0], [0, 0, 0]);
        api.applyImpulse(
          [0, 5, 0],
          [randomForceX, randomForceY, randomForceZ]
        );

        startDiceMonitor(handleResult);
      });
    },
    isMoving: () => isMoving,
  }));

  useEffect(() => {
    if (!isMoving && result !== null) {
      console.log("🎲 :", result);
    }
  }, [isMoving, result]);

  return (
    <group ref={diceRef}>
      <primitive object={scene.clone()} scale={1} />
    </group>
  );
});

export default Dice;