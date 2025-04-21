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
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import { decreaseCoin } from "@/lib/poker/fetchPoker.ts";

export default function Poker() {
  const {
    deck,
    result,
    isChanged,
    selectedIndices,
    started,
    toggleSelect,
    handleChange,
    handleRetry,
    setStarted,
  } = usePokerGame();
  const { decCoin, setScore, coin, bet, setCoin } = useScoreStore();
  const { setPhase } = usePhaseStore();
  const { session } = useSupabaseAuth();
  const [gameOver, setGameOver] = useState(false);

  const spendCoin = async () => {
    decCoin(bet); // 로컬 상태 먼저 차감
    if (session) {
      const updated = await decreaseCoin({ session, bet });
      if (updated !== null) {
        setCoin(updated);
      }
    }
  };

  const handleStart = async () => {
    setStarted(true);
    await spendCoin();
  };

  const handleEnd = () => {
    setGameOver(false);
    setPhase("start");
  };

  useEffect(() => {
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
  }, [isChanged, coin, result?.name]);

  const renderActionButton = () => {
    if (!started) {
      return (
        <button
          onClick={handleStart}
          className="rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100"
        >
          시작하기
        </button>
      );
    }

    if (started && result && !gameOver) {
      return (
        <ActionButton
          isChanged={isChanged}
          result={result.name}
          handleClick={handleChange}
          retry={handleRetry}
        />
      );
    }

    return null;
  };

  return (
    <>
      <HandRankings />

      <div className="flex flex-col gap-4 pt-2">
        {/* 결과 출력 */}
        <div
          className={cn(
            "flex flex-col justify-center text-center",
            !isChanged && "invisible",
          )}
        >
          <p>결과</p>
          <p className="text-3xl font-extrabold">{result?.name}</p>
        </div>

        {/* 카드 */}
        <div>
          <div className="grid grid-cols-5 gap-3 pb-5">
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

          <div className="flex justify-center">{renderActionButton()}</div>
        </div>
      </div>

      {/* GAME OVER */}
      <AlertDialog open={gameOver}>
        <AlertDialogContent>
          <div>
            <p>게임오버</p>
          </div>
          <AlertDialogFooter className="justify-center">
            <AlertDialogAction onClick={handleEnd} className="w-full">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
