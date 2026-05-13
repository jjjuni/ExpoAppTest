import { create } from "zustand";

interface DiceState {
  result_1: number | null;
  result_2: number | null;

  setResult_1: (value: number) => void;
  setResult_2: (value: number) => void;
}

export const useDiceStore = create<DiceState>(
  (set) => ({
    result_1: null,
    result_2: null,

    setResult_1(value) {
      set({ result_1: value });
    },
    setResult_2(value) {
      set({ result_2: value });
    }
  })
);