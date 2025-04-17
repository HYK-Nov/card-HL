import { THandRanking } from "@/types/pokerTypes.ts";
import { create } from "zustand/index";

type HandStore = {
  bestHand: THandRanking | null;
  setBestHand: (data: THandRanking | null) => void;
};

type ScoreStore = {
  score: number;
  coin: number;
  bet: number;
  setScore: (data: number) => void;
  setCoin: (data: number) => void;
  setBet: (data: number) => void;
  incScore: () => void;
  incCoin: (data: number) => void;
  decCoin: (data: number) => void;
};

export const useHandStore = create<HandStore>()((set) => ({
  bestHand: null,
  setBestHand: (hand: THandRanking | null) => set(() => ({ bestHand: hand })),
}));

export const useScoreStore = create<ScoreStore>()((set) => ({
  coin: 0,
  score: 0,
  bet: 0,
  setScore: (data: number) => set(() => ({ score: data })),
  setCoin: (data: number) => set(() => ({ coin: data })),
  setBet: (data: number) => set(() => ({ bet: data })),
  incScore: () => set((state) => ({ score: state.score * 2 })),
  incCoin: (data: number) => set((state) => ({ coin: state.coin + data })),
  decCoin: (data: number) => set((state) => ({ coin: state.coin - data })),
}));
