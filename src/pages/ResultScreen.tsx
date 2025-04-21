import { useEffect, useState } from "react";
import { getRanking } from "@/lib/ranking/fetchRanking.ts";

export default function ResultScreen() {
  const [rankings, setRankings] = useState<
    | {
        email: string;
        total_score: number;
      }[]
    | null
  >(null);

  const fetchRanking = async () => {
    await getRanking().then((res) => setRankings(res!));
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <p>RESULT PHASE</p>
        {rankings &&
          rankings.length > 0 &&
          rankings.map((ranking, index) => (
            <p key={index}>
              {ranking.email} {ranking.total_score}
            </p>
          ))}
      </div>
    </>
  );
}
