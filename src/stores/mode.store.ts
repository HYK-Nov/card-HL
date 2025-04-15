import { create } from "zustand";

type ModeStore = {
  isEasyMode: boolean;
  toggleEasyMode: () => void;
};

export const useModeStore = create<ModeStore>()((set) => ({
  isEasyMode: false,
  toggleEasyMode: () =>
    set((state) => {
      return { isEasyMode: !state.isEasyMode };
    }),
}));
