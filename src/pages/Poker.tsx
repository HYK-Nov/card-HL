import TrumpCard from "@/components/poker/TrumpCard.tsx";
import { cn } from "@/lib/utils.ts";
import ActionButton from "@/components/poker/ActionButton.tsx";
import { usePokerGame } from "@/hooks/poker/usePokerGame.ts";
import { useScoreStore } from "@/stores/score.store.ts";
import { useEffect, useState } from "react";
import HandRankings from "@/components/poker/HandRankings.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog.tsx";
import { usePhaseStore } from "@/stores/state.store.ts";

export default function Poker() {
  const {
    deck,
    result,
    isChanged,
    selectedIndices,
    toggleSelect,
    handleChange,
    handleRetry,
  } = usePokerGame();
  const { decCoin, setScore, coin, bet } = useScoreStore();
  const { setPhase } = usePhaseStore();
  const [gameOver, setGameOver] = useState(false);

  const handleEnd = () => {
    setGameOver(false);
    setPhase("start");
  };

  useEffect(() => {
    decCoin(bet);
    setScore(0);
  }, []);

  useEffect(() => {
    if (
      result &&
      coin <= 0 &&
      ["노페어", "원페어"].includes(result.name) &&
      isChanged
    ) {
      setGameOver(true);
    }
  }, [isChanged]);

  return (
    <>
      <HandRankings />
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
            {result && !gameOver && (
              <ActionButton
                isChanged={isChanged}
                result={result.name}
                handleClick={handleChange}
                handleRetry={handleRetry}
              />
            )}
          </div>
        </div>
      </div>

      {/* GAME OVER */}
      <AlertDialog open={gameOver}>
        <AlertDialogContent>
          <div>
            <p>게임오버</p>
          </div>
          <AlertDialogFooter className={"justify-center"}>
            <AlertDialogAction onClick={handleEnd} className={"w-full"}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
