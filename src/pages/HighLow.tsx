import TrumpCard from "@/components/poker/TrumpCard.tsx";
import { cn } from "@/lib/utils.ts";
import TrumpCardAnimation from "@/components/poker/TrumpCardAnimation.tsx";
import { useHighLowGame } from "@/hooks/highlow/useHighLowGame.ts";
import ActionButton from "@/components/highlow/ActionButton.tsx";

export default function HighLow() {
  const {
    isResultVisible,
    result,
    count,
    deck,
    handleRetry,
    handleGo,
    handleStop,
    handleHighLow,
    handleEnd,
    handleChangeBet,
  } = useHighLowGame();

  const secondCard = isResultVisible ? deck[1] : "ZZ";

  return (
    <>
      <div className="flex flex-col gap-[4rem] py-[1rem]">
        {/* 결과 출력 */}
        <div
          className={cn(
            "flex flex-col justify-center text-center",
            !isResultVisible && "invisible",
          )}
        >
          <p>결과</p>
          <p className={"text-3xl font-extrabold"}>{`${result} (${count})`}</p>
        </div>

        {/* 카드 */}
        <div className={"flex flex-col gap-[3rem]"}>
          <div className="flex justify-center gap-[4rem]">
            <TrumpCard value={deck[0]} isInteracting={false} />
            <TrumpCardAnimation key={secondCard} value={secondCard} />
          </div>
          <div className={"grid grid-cols-2 gap-3"}>
            <ActionButton
              visible={isResultVisible}
              result={result}
              handleHighLow={handleHighLow}
              handleGo={handleGo}
              stop={handleStop}
              handleRetry={handleRetry}
              handleEnd={handleEnd}
              handleChangeBet={handleChangeBet}
            />
          </div>
        </div>
      </div>
    </>
  );
}
