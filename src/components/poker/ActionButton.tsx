import { usePhaseStore } from "@/stores/state.store.ts";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import { useScoreStore } from "@/stores/score.store.ts";
import { decreaseCoin } from "@/lib/poker/fetchPoker.ts";
import { useNavigate } from "react-router";

type Props = {
  isChanged: boolean;
  gameOver: boolean;
  result: string;
  retry: () => void;
  handleClick: () => void;
};

export default function ActionButton({
  result,
  isChanged,
  gameOver,
  retry,
  handleClick,
}: Props) {
  const { setPhase } = usePhaseStore();
  const { session } = useSupabaseAuth();
  const { bet, setCoin, decCoin } = useScoreStore();
  const navigate = useNavigate();
  const baseStyle =
    "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100";
  const isRetry = result === "노페어" || result === "원페어";

  const onRetry = async () => {
    // 로컬에서 먼저 차감
    decCoin(bet);

    if (session) {
      try {
        // 서버와의 통신 처리
        const updated = await decreaseCoin({ session, bet });
        if (updated === null) {
          console.error("서버에서 코인 차감에 실패했습니다.");
        } else {
          setCoin(updated); // 서버에서 받은 최신 코인 값으로 로컬 상태 업데이트
        }
      } catch (err) {
        console.error("서버와의 통신 오류:", err);
      }
    }

    retry();
  };

  const onNext = () => setPhase("highlow");

  const onEnd = () => navigate("/");

  if (!isChanged) {
    return (
      <button onClick={handleClick} className={baseStyle}>
        결정
      </button>
    );
  }

  return (
    <>
      <button
        onClick={gameOver ? onEnd : isRetry ? onRetry : onNext}
        className={`${baseStyle} `}
      >
        {gameOver ? "돌아가기" : isRetry ? "다시 도전하기" : "다음"}
      </button>
    </>
  );
}
