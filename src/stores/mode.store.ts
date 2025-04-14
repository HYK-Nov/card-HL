import { create } from "zustand";

type Store = {
  isEasyMode: boolean;
  toggleEasyMode: (toggle: boolean) => void;
};

export const useModeStore = create<Store>()((set) => ({
  isEasyMode: false,
  toggleEasyMode: (toggle) =>
    set(() => {
      return { isEasyMode: toggle };
    }),
}));
