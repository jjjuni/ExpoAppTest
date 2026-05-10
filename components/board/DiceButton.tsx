import { Pressable, Text, View } from "react-native";

import { useGameStore } from "../../store/useBoardStore";

export function DiceButton() {
  const rollDice = useGameStore(
    (state) => state.rollDice
  );

  const diceValue = useGameStore(
    (state) => state.diceValue
  );

  return (
    <View
      style={{
        position: "absolute",
        top: 60,
        left: 20,
        zIndex: 100,
      }}
    >
      <Pressable
        onPress={rollDice}
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 10,
        }}
      >
        <Text>🎲 주사위 굴리기</Text>
      </Pressable>

      <Text
        style={{
          fontSize: 28,
          color: "white",
          marginTop: 10,
        }}
      >
        {diceValue}
      </Text>
    </View>
  );
}