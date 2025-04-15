import { useModeStore } from "@/stores/mode.store.ts";
import { useHandStore } from "@/stores/score.store.ts";
import { useEffect, useState } from "react";
import { THandRanking } from "@/types/pokerTypes.ts";
import { getBestHand, getRandomCards } from "@/lib/poker/pokerLogic.ts";

export const usePokerGame = () => {
  const { isEasyMode } = useModeStore();
  const { setBestHand } = useHandStore();

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
  };

  useEffect(() => {
    setDeck(getRandomCards());
  }, []);

  useEffect(() => {
    if (deck.length > 0) {
      const hand = getBestHand(deck, isEasyMode);
      setResult(hand);
      if (isChanged) setBestHand(hand);
    }
  }, [deck]);

  return {
    deck,
    result,
    isChanged,
    selectedIndices,
    toggleSelect,
    handleChange,
    handleRetry,
  };
};
