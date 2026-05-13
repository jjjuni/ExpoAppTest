import { create } from "zustand";

interface GameState {
  currentIndex: number;
  diceValue: number;

  rollDice: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  currentIndex: 0,
  diceValue: 1,

  rollDice: () => {
    const dice = Math.floor(Math.random() * 6) + 1;

    set((state) => ({
      diceValue: dice,
      currentIndex:
        (state.currentIndex + dice) % 16,
    }));
  },
}));