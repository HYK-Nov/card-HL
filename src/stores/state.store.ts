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

type GamePhase = "start" | "betting" | "poker" | "highlow" | "result";
type PhaseStore = {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;
};

export const usePhaseStore = create<PhaseStore>()((set) => ({
  phase: "start",
  setPhase: (phase: GamePhase) => set(() => ({ phase: phase })),
}));
