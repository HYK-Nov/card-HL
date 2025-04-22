import { useScoreStore } from "@/stores/score.store.ts";
import { cn } from "@/lib/utils.ts";
import { usePhaseStore } from "@/stores/state.store.ts";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import { useEffect } from "react";
import { BiSolidRightArrow } from "react-icons/bi";

const BETTING_OPTIONS = [
  { value: 100, color: "green", minCoin: 100 },
  { value: 500, color: "green", minCoin: 500 },
  { value: 1000, color: "yellow", minCoin: 1000 },
  { value: 5000, color: "yellow", minCoin: 5000 },
  { value: 10000, color: "red", minCoin: 10000 },
];

const getButtonClass = (coin: number, minCoin: number, color: string) => {
  return cn(
    "rounded border-3 border-neutral-400 p-2 text-neutral-400 flex justify-between items-center ",
    coin >= minCoin ? `border-${color}-500 text-${color}-500` : "",
  );
};

export default function Betting() {
  const { coin, setBet, setCoin, setScore } = useScoreStore();
  const { setPhase, phase } = usePhaseStore();
  const { session } = useSupabaseAuth();

  const handleBetting = (bet: number) => {
    setBet(bet);
    setPhase("poker");
  };

  useEffect(() => {
    if (!session && coin === 0) {
      setCoin(10000);
    }
  }, [session, coin, setCoin]);

  useEffect(() => {
    if (phase === "betting") {
      setScore(0);
    }
  }, [phase, setScore]);

  return (
    <div className="flex flex-col gap-5 pt-5 pb-[100px]">
      <p className={"GmarketSans text-center text-5xl"}>BETTING ROOM</p>
      <div className="flex flex-col gap-2 text-2xl font-bold">
        {BETTING_OPTIONS.map(({ value, color, minCoin }) => (
          <button
            key={value}
            onClick={() => handleBetting(value)}
            disabled={coin < minCoin}
            className={getButtonClass(coin, minCoin, color)}
          >
            <div className={"flex items-center gap-3"}>
              <img
                src={"src/assets/images/bet_img2.jpg"}
                className="h-auto w-30 rounded"
                alt="Betting image"
              />
              <p>{value} BET</p>
            </div>
            <BiSolidRightArrow />
          </button>
        ))}
      </div>
    </div>
  );
}
