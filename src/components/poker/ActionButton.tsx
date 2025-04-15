type Props = {
  isChanged: boolean;
  result: string;
  handleClick: () => void;
  handleRetry: () => void;
  onNext: () => void;
};

export default function ActionButton({
  result,
  isChanged,
  onNext,
  handleRetry,
  handleClick,
}: Props) {
  const baseStyle =
    "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100";

  const handleNext = () => {
    if (!isRetry) {
      onNext();
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
