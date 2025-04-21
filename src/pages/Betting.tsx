import { useScoreStore } from "@/stores/score.store.ts";
import { cn } from "@/lib/utils.ts";
import { usePhaseStore } from "@/stores/state.store.ts";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import { useEffect } from "react";

export default function Betting() {
  const { coin, setBet, setCoin } = useScoreStore();
  const { setPhase } = usePhaseStore();
  const { session } = useSupabaseAuth();

  const handleBetting = (bet: number) => {
    setBet(bet);
    setPhase("poker");
  };

  useEffect(() => {
    if (!session) {
      setCoin(10000);
    }
  }, []);

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
              "rounded-full border-5 border-neutral-400 px-5 py-1 text-neutral-400",
              coin >= 100 ? "border-green-400 text-green-400" : "",
            )}
          >
            100
          </button>
          <button
            disabled={coin < 500}
            onClick={() => handleBetting(500)}
            className={cn(
              "rounded-full border-5 border-neutral-400 px-5 py-1 text-neutral-400",
              coin >= 500 ? "border-amber-500 text-amber-500" : "",
            )}
          >
            500
          </button>
          <button
            disabled={coin < 1000}
            onClick={() => handleBetting(1000)}
            className={cn(
              "rounded-full border-5 border-neutral-400 px-5 py-1 text-neutral-400",
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
