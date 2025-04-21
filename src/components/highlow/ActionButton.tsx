import { useScoreStore } from "@/stores/score.store.ts";
import { increaseCoin } from "@/lib/highlow/fetchHighlow.ts";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";

type Props = {
  visible: boolean;
  result: string;
  handleGo: () => void;
  stop: () => void;
  handleRetry: () => void;
  handleEnd: () => void;
  handleChangeBet: () => void;
  handleHighLow: (data: "high" | "low") => void;
};

export default function ActionButton({
  visible,
  result,
  stop,
  handleGo,
  handleRetry,
  handleHighLow,
  handleEnd,
}: Props) {
  const { coin, score } = useScoreStore();
  const { session } = useSupabaseAuth();
  const buttonBase = "rounded py-1 text-xl transition-colors duration-200";

  const handleStop = async () => {
    stop();
    if (session) {
      await increaseCoin({ session, score });
    }
  };

  if (visible && result === "lose") {
    return (
      <div className={"col-span-2 flex justify-center"}>
        <button
          onClick={coin > 0 ? handleRetry : handleEnd}
          className={`${buttonBase} bg-background border-3 border-yellow-500 px-20 text-yellow-500 hover:bg-yellow-100/50`}
        >
          다시 도전하기
        </button>
      </div>
    );
  }

  if (visible) {
    return (
      <>
        <button
          onClick={handleGo}
          className={`${buttonBase} bg-background border-3 border-rose-500 text-rose-500 hover:bg-rose-100/50`}
        >
          GO
        </button>
        <button
          onClick={handleStop}
          className={`${buttonBase} bg-background border-3 border-blue-500 text-blue-500 hover:bg-blue-100/50`}
        >
          STOP
        </button>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => handleHighLow("high")}
        className={`${buttonBase} text-background border-3 border-rose-500 bg-rose-500 hover:border-rose-600 hover:bg-rose-600`}
      >
        하이
      </button>
      <button
        onClick={() => handleHighLow("low")}
        className={`${buttonBase} text-background border-3 border-blue-500 bg-blue-500 hover:border-blue-600 hover:bg-blue-600`}
      >
        로우
      </button>
    </>
  );
}
