import { create } from "zustand";

interface BoardState {
  isLoading: boolean;

  setIsLoading: (value: boolean) => void;
}

export const useBoardStore = create<BoardState>(
  (set) => ({
    isLoading: true,

    setIsLoading(value) {
      set({ isLoading: value })
    },
  })
);