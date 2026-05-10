import { useGLTF } from "@react-three/drei/native";
import { useBox } from "@react-three/cannon";

export default function Dice() {
  const glb = require("../../assets/dice/dice_rounded_white.glb");

  const gltf: any = useGLTF(glb);

  const [ref] = useBox(() => {
    return {
      mass: 1,
      position: [0, 10, 0] as [number, number, number],
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


  return (
    <group ref={ref}>
      <primitive object={gltf.scene.clone()} scale={1} />
    </group>
  );
}