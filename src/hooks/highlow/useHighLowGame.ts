import { usePhaseStore } from "@/stores/state.store.ts";
import { useScoreStore } from "@/stores/score.store.ts";
import { useEffect, useState } from "react";
import { getWinningCard } from "@/lib/highlow/highlowLogic.ts";
import { getRandomCards } from "@/lib/poker/pokerLogic.ts";
import { toast } from "sonner";

export const useHighLowGame = () => {
  const { setPhase } = usePhaseStore();
  const { incScore, score, incCoin, setScore } = useScoreStore();
  const [deck, setDeck] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState("0");
  const [isResultVisible, setIsResultVisible] = useState(false);
  const handleRetry = () => {
    setPhase("poker");
    setScore(0);
  };

  const handleHighLow = (mode: "high" | "low") => {
    if (deck.length > 0) {
      const compareResult = getWinningCard(deck, mode);
      setResult(compareResult);
      setIsResultVisible(true);

      if (compareResult === "win") {
        incScore();
        setCount((prev) => prev + 1);
      }
    }
  };

  const handleGo = () => {
    let temp: string[];
    do {
      temp = getRandomCards(2, 0);
    } while (temp.some((value) => deck.includes(value)));

    setDeck(temp);
    setResult(".");
    setIsResultVisible(false);
  };

  const handleStop = () => {
    incCoin(score);
    setPhase("betting");
  };

  const handleEnd = () => {
    setPhase("betting");
    // navigate("/");
  };

  const handleChangeBet = () => {
    setPhase("betting");
  };

  useEffect(() => {
    setDeck(getRandomCards(2, 0));
  }, []);

  useEffect(() => {
    if (count == 10) {
      toast.success("축하합니다!");
    }
  }, [count]);

  return {
    result,
    isResultVisible,
    count,
    deck,
    handleHighLow,
    handleGo,
    handleStop,
    handleRetry,
    handleEnd,
    handleChangeBet,
  };
};
