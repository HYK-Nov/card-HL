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
  const { decCoin, coin, bet, setCoin } = useScoreStore();
  const { setPhase } = usePhaseStore();
  const { session } = useSupabaseAuth();
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

  const spendCoin = async () => {
    if (!session) {
      // 로그인되지 않으면 로컬 상태에서만 차감
      decCoin(bet);
      return;
    }

    setIsLoading(true); // 서버 요청 시작

    try {
      // 서버와 통신하여 코인 차감
      const updated = await decreaseCoin({ session, bet });
      if (updated !== null) {
        setCoin(updated); // 서버에서 받은 최신 코인 값으로 로컬 상태 업데이트
      } else {
        console.error("서버에서 코인 차감에 실패했습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 오류:", error);
    } finally {
      setIsLoading(false); // 서버 요청 완료
    }
  };

  const handleStart = async () => {
    await spendCoin();
    setStarted(true);
  };

  const handleEnd = () => {
    setGameOver(false);
    setPhase("betting");
  };

  // 게임 오버 상태 체크
  useEffect(() => {
    if (coin - bet < 0) {
      setGameOver(true);
    }
  }, [coin]);

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

          <div className="flex justify-center">
            {!started ? (
              <button
                disabled={isLoading}
                onClick={handleStart}
                className="rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100"
              >
                {isLoading ? "처리 중..." : "게임 시작"}
              </button>
            ) : result && !gameOver ? (
              <ActionButton
                isChanged={isChanged}
                result={result.name}
                handleClick={handleChange}
                retry={handleRetry}
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* GAME OVER */}
      <AlertDialog open={gameOver}>
        <AlertDialogContent>
          <div>
            <p>코인이 부족합니다</p>
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
