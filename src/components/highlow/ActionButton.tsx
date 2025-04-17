import { useScoreStore } from "@/stores/score.store.ts";

type Props = {
  visible: boolean;
  result: string;
  handleGo: () => void;
  handleStop: () => void;
  handleRetry: () => void;
  handleEnd: () => void;
  handleChangeBet: () => void;
  handleHighLow: (data: "high" | "low") => void;
};

export default function ActionButton({
  visible,
  result,
  handleStop,
  handleGo,
  handleRetry,
  handleHighLow,
  handleEnd,
  handleChangeBet,
}: Props) {
  const { coin } = useScoreStore();
  const buttonBase = "rounded py-1 text-xl transition-colors duration-200";

  if (visible && result === "lose") {
    return (
      <>
        <button
          onClick={coin > 0 ? handleChangeBet : handleEnd}
          className={`${buttonBase} bg-background border-3 border-yellow-500 px-20 text-yellow-500 hover:bg-yellow-100/50`}
        >
          베팅 변경하기
        </button>
        <button
          onClick={coin > 0 ? handleRetry : handleEnd}
          className={`${buttonBase} bg-background border-3 border-yellow-500 px-20 text-yellow-500 hover:bg-yellow-100/50`}
        >
          다시 도전하기
        </button>
      </>
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
