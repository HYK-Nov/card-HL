import { useScoreStore } from "@/stores/score.store.ts";
import { cn } from "@/lib/utils.ts";
import { usePhaseStore } from "@/stores/state.store.ts";

export default function Betting() {
  const { coin, setBet } = useScoreStore();
  const { setPhase } = usePhaseStore();

  const handleBetting = (bet: number) => {
    setBet(bet);
    setPhase("poker");
  };

  return (
    <>
      <div className={"flex flex-col gap-5 py-5"}>
        <p className={"text-center text-4xl"}>베팅 페이지</p>
        {/* 베팅 버튼 */}
        <div
          className={
            "flex justify-center gap-[5rem] text-center text-2xl font-bold"
          }
        >
          <button
            onClick={() => handleBetting(100)}
            disabled={coin < 100}
            className={cn(
              "rounded-full border-5 px-5 py-1",
              coin >= 100 ? "border-green-400 text-green-400" : "",
            )}
          >
            100
          </button>
          <button
            disabled={coin < 500}
            onClick={() => handleBetting(500)}
            className={cn(
              "rounded-full border-5 px-5 py-1",
              coin >= 500 ? "border-amber-500 text-amber-500" : "",
            )}
          >
            500
          </button>
          <button
            disabled={coin < 1000}
            onClick={() => handleBetting(1000)}
            className={cn(
              "rounded-full border-5 px-5 py-1",
              coin >= 1000 ? "border-red-500 text-red-500" : "",
            )}
          >
            1000
          </button>
        </div>
      </div>
    </>
  );
}
