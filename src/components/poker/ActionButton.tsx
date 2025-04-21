import { usePhaseStore } from "@/stores/state.store.ts";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import { useScoreStore } from "@/stores/score.store.ts";
import { decreaseCoin } from "@/lib/poker/fetchPoker.ts";

type Props = {
  isChanged: boolean;
  result: string;
  handleClick: () => void;
  retry: () => void;
};

export default function ActionButton({
  result,
  isChanged,
  retry,
  handleClick,
}: Props) {
  const { setPhase } = usePhaseStore();
  const { session } = useSupabaseAuth();
  const { bet } = useScoreStore();

  const isRetry = result === "노페어" || result === "원페어";
  const baseStyle =
    "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100";

  const handleRetryClick = async () => {
    retry();
    if (session) {
      try {
        await decreaseCoin({ session, bet });
      } catch (err) {
        console.error("코인 차감 실패:", err);
      }
    }
  };

  const handleNextClick = () => {
    setPhase("highlow");
  };

  const renderButton = () => {
    if (!isChanged) {
      return (
        <button onClick={handleClick} className={baseStyle}>
          결정
        </button>
      );
    }

    return (
      <button
        onClick={isRetry ? handleRetryClick : handleNextClick}
        className={baseStyle}
      >
        {isRetry ? "다시 도전하기" : "다음"}
      </button>
    );
  };

  return renderButton();
}
