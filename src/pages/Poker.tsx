import TrumpCard from "@/components/poker/TrumpCard.tsx";
import { cn } from "@/lib/utils.ts";
import ActionButton from "@/components/poker/ActionButton.tsx";
import { usePokerGame } from "@/hooks/poker/usePokerGame.ts";
import { useScoreStore } from "@/stores/score.store.ts";
import { useEffect } from "react";

type Props = {
  onNext: () => void;
};

export default function Poker({ onNext }: Props) {
  const {
    deck,
    result,
    isChanged,
    selectedIndices,
    toggleSelect,
    handleChange,
    handleRetry,
  } = usePokerGame();
  const { setCoin, setScore } = useScoreStore();

  useEffect(() => {
    setCoin(3000);
    setScore(1000);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 py-3">
        {/* 결과 출력 */}
        <div
          className={cn(
            "flex flex-col justify-center text-center",
            !isChanged && "invisible",
          )}
        >
          <p>결과</p>
          <p className={"text-3xl font-extrabold"}>{result && result.name}</p>
        </div>

        {/* 카드 */}
        <div>
          <div className={"grid grid-cols-5 gap-3 pb-5"}>
            {deck.map((item, idx) => (
              <TrumpCard
                key={idx}
                value={item}
                selected={selectedIndices.includes(idx)}
                isChanged={isChanged}
                onClick={() => toggleSelect(idx)}
              />
            ))}
          </div>
          <div className={"flex justify-center"}>
            {/* 버튼 */}
            {result && (
              <ActionButton
                isChanged={isChanged}
                result={result.name}
                handleClick={handleChange}
                handleRetry={handleRetry}
                onNext={onNext}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
