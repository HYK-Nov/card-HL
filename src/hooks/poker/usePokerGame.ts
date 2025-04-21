import { useModeStore } from "@/stores/state.store.ts";
import { useHandStore, useScoreStore } from "@/stores/score.store.ts";
import { useEffect, useState } from "react";
import { THandRanking } from "@/types/pokerTypes.ts";
import { getBestHand, getRandomCards } from "@/lib/poker/pokerLogic.ts";

export const usePokerGame = () => {
  const { isEasyMode } = useModeStore();
  const { setBestHand } = useHandStore();
  const { setScore, decCoin, bet } = useScoreStore();

  const [started, setStarted] = useState(false);
  const [deck, setDeck] = useState<string[]>([]);
  const [result, setResult] = useState<THandRanking>();
  const [isChanged, setIsChanged] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleChange = () => {
    let temp = getRandomCards(selectedIndices.length);
    while (temp.some((card) => deck.includes(card))) {
      temp = getRandomCards(selectedIndices.length);
    }

    const newDeck = [...deck];
    selectedIndices.forEach((index, i) => {
      newDeck[index] = temp[i];
    });

    setDeck(newDeck);
    setSelectedIndices([]);
    setIsChanged(true);
  };

  const handleRetry = () => {
    setDeck(getRandomCards());
    setIsChanged(false);
    setBestHand(null);
    decCoin(bet);
  };

  useEffect(() => {
    if (started) {
      setDeck(getRandomCards());
    }
  }, [started]);

  useEffect(() => {
    if (deck.length > 0) {
      const hand = getBestHand(deck, isEasyMode);
      setResult(hand);
      if (isChanged) {
        setBestHand(hand);
        if (!["노페어", "원페어"].includes(hand.name)) {
          setScore(hand.multiplier * bet);
        }
      }
    }
  }, [deck]);

  return {
    deck,
    result,
    isChanged,
    selectedIndices,
    started,
    toggleSelect,
    handleChange,
    handleRetry,
    setStarted,
  };
};
