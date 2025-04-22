import { useScoreStore } from "@/stores/score.store.ts";

export default function ScoreSection() {
  const { score, coin } = useScoreStore();

  return (
    <>
      <div
        className={"orbitron grid grid-cols-2 gap-5 pb-2 text-lg font-semibold"}
      >
        <div className="flex items-center gap-2">
          <p className={""}>SCORE</p>
          <div
            className={"grow rounded border-2 bg-white/20 px-2 py-1 text-sm"}
          >
            {score}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p>COIN</p>
          <div
            className={"grow rounded border-2 bg-white/20 px-2 py-1 text-sm"}
          >
            {coin}
          </div>
        </div>
      </div>
    </>
  );
}
