import { usePhaseStore } from "@/stores/state.store.ts";

type Props = {
  isChanged: boolean;
  result: string;
  handleClick: () => void;
  handleRetry: () => void;
};

export default function ActionButton({
  result,
  isChanged,
  handleRetry,
  handleClick,
}: Props) {
  const { setPhase } = usePhaseStore();
  const baseStyle =
    "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100";

  const handleNext = () => {
    if (!isRetry) {
      setPhase("highlow");
    }
  };

  if (!isChanged) {
    return (
      <button onClick={handleClick} className={baseStyle}>
        결정
      </button>
    );
  }

  const isRetry = result === "노페어" || result === "원페어";
  return (
    <button onClick={isRetry ? handleRetry : handleNext} className={baseStyle}>
      {isRetry ? "다시 도전하기" : "다음"}
    </button>
  );
}
