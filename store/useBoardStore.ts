import { create } from "zustand";

interface GameState {
  currentIndex: number;
  diceValue: number;
  rolling: boolean;

  rollDice: () => void;
}

export const useGameStore = create<GameState>(
  (set, get) => ({
    currentIndex: 0,
    diceValue: 1,
    rolling: false,

    rollDice: () => {
      if (get().rolling) return;

      set({ rolling: true });

      const dice =
        Math.floor(Math.random() * 6) + 1;

      setTimeout(() => {
        set((state) => ({
          diceValue: dice,
          currentIndex:
            (state.currentIndex + dice) % 16,
          rolling: false,
        }));
      }, 1500);
    },
  })
);