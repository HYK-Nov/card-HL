import { useEffect, useState } from "react";
import { getRandomCards } from "@/lib/poker/pokerLogic.ts";
import { getWinningCard } from "@/lib/highlow/highlowLogic.ts";
import { useScoreStore } from "@/stores/score.store.ts";
import TrumpCard from "@/components/poker/TrumpCard.tsx";
import { cn } from "@/lib/utils.ts";
import TrumpCardAnimation from "@/components/poker/TrumpCardAnimation.tsx";

type Props = {
  onRetry: () => void;
};

export default function HighLow({ onRetry }: Props) {
  const { incScore } = useScoreStore();
  const [deck, setDeck] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState("0");
  const [isResultVisible, setIsResultVisible] = useState(false);
  const handleRetry = () => {
    onRetry();
  };

  const handleHighLow = (mode: "high" | "low") => {
    if (deck.length > 0) {
      const compareResult = getWinningCard(deck, mode);
      setResult(compareResult);
      setIsResultVisible(true);

      if (compareResult === "win") {
        incScore();
        setCount((prev) => prev + 1);
      } else if (compareResult === "lose") {
        //   TODO
      } else {
        //   DRAW
        //   TODO
      }
    }
  };

  useEffect(() => {
    setDeck(getRandomCards(2, 0));
  }, []);

  // TODO
  return (
    <>
      <div className="flex flex-col gap-4 py-3">
        {/* 결과 출력 */}
        <div
          className={cn(
            "flex flex-col justify-center text-center",
            !isResultVisible && "invisible",
          )}
        >
          <p>결과</p>
          <p className={"text-3xl font-extrabold"}>{`${result} (${count})`}</p>
        </div>

        {/* 카드 */}
        <div>
          <div className="flex justify-center gap-[4rem] pb-5">
            <TrumpCard value={deck[0]} isInteracting={false} />
            <TrumpCardAnimation value={isResultVisible ? deck[1] : "ZZ"} />
          </div>
          <div className={"grid grid-cols-2 gap-3"}>
            {!isResultVisible ? (
              <>
                <button
                  onClick={() => handleHighLow("high")}
                  className={
                    "text-background rounded bg-rose-500 py-1 text-xl hover:bg-rose-600"
                  }
                >
                  하이
                </button>
                <button
                  onClick={() => handleHighLow("low")}
                  className={
                    "text-background rounded bg-blue-500 py-1 text-xl hover:bg-blue-600"
                  }
                >
                  로우
                </button>
              </>
            ) : (
              <>
                <button
                  className={
                    "bg-background rounded border-3 border-rose-500 py-1 text-xl text-rose-500 hover:bg-rose-100/50"
                  }
                >
                  GO
                </button>
                <button
                  className={
                    "bg-background rounded border-3 border-blue-500 py-1 text-xl text-blue-500 hover:bg-blue-100/50"
                  }
                >
                  STOP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
