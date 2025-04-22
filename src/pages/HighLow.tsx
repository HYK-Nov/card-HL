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
      <div className="flex flex-col gap-[3rem] pt-[3rem]">
        {/* 결과 출력 */}
        <div
          className={cn(
            "flex flex-col justify-center text-center",
            !isResultVisible && "invisible",
          )}
        >
          <p
            className={"GmarketSans text-5xl font-extrabold"}
          >{`${result.toUpperCase()} (${count})`}</p>
        </div>

        {/* 카드 */}
        <div className={"flex flex-col gap-[3rem]"}>
          <div className="flex justify-center gap-4 px-4 sm:gap-6 md:gap-8">
            <div className="aspect-[63/88] w-[25vw] max-w-[120px]">
              <TrumpCard value={deck[0]} isInteracting={false} />
            </div>
            <div className="aspect-[63/88] w-[25vw] max-w-[120px]">
              <TrumpCardAnimation key={secondCard} value={secondCard} />
            </div>
          </div>
          <div className={"grid grid-cols-2 gap-3"}>
            <ActionButton
              visible={isResultVisible}
              result={result}
              count={count}
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
