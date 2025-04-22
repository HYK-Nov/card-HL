import { useEffect, useState } from "react";
import { getRanking } from "@/lib/ranking/fetchRanking.ts";
import { AiOutlineLoading } from "react-icons/ai";
import { cn } from "@/lib/utils.ts";

type TRanking = {
  name: string;
  total_score: number;
  picture: string;
};

export default function Ranking() {
  const [rankings, setRankings] = useState<TRanking[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRanking = async () => {
    await getRanking().then((res) => setRankings(res!));
  };

  useEffect(() => {
    fetchRanking().then(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mb-[100px] flex flex-col">
        <p className={"py-5 text-center text-3xl font-bold"}>🏆 RANKING 🏆</p>
        <div className="flex h-full flex-col gap-2">
          {loading && (
            <div className="flex h-full w-full items-center justify-center">
              <AiOutlineLoading className={"size-16 animate-spin"} />
            </div>
          )}
          {rankings &&
            rankings.length > 0 &&
            rankings.map((ranking, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between gap-2 rounded border px-4 py-2 text-lg",
                  "animate-(--animate-fadeUp)",
                )}
              >
                <div className="flex items-center gap-3">
                  <p className={"pr-2"}>{index + 1}</p>
                  <img
                    src={ranking.picture}
                    alt=""
                    className={"size-10 rounded-full"}
                  />
                  <p key={index}>{ranking.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p>
                    {index == 0 && "🥇"}
                    {index == 1 && "🥈"}
                    {index == 2 && "🥉"}
                  </p>
                  <p key={index}>{ranking.total_score}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
