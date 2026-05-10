import { OrbitControls } from "@react-three/drei/native";
import { Canvas } from "@react-three/fiber/native";
import { View } from "react-native";

export default function Scene({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <Canvas camera={{ position: [0, 30, 20], fov: 50 }}>
        <ambientLight color={"#FFFFFF"} intensity={0.5} />
        <directionalLight
          color={"#FFFFFF"}
          intensity={3}
          position={[0, 5, 0]}
        />

        {children}

        <OrbitControls />
      </Canvas>
    </View>
  );
}