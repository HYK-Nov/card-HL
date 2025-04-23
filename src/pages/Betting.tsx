import { useScoreStore } from "@/stores/score.store.ts";
import { cn } from "@/lib/utils.ts";
import { usePhaseStore } from "@/stores/state.store.ts";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import { useEffect, useRef } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import betImg from "@/assets/images/bet_img2.jpg";

const BETTING_OPTIONS = [
  { value: 100, color: "green", minCoin: 100 },
  { value: 500, color: "green", minCoin: 500 },
  { value: 1000, color: "yellow", minCoin: 1000 },
  { value: 5000, color: "yellow", minCoin: 5000 },
  { value: 10000, color: "red", minCoin: 10000 },
];

const getButtonClass = (coin: number, minCoin: number, color: string) => {
  const base =
    "rounded border-3 p-2 flex justify-between items-center transition";
  const disabled = "border-neutral-400 text-neutral-400 cursor-not-allowed";
  const enabled = {
    green: "border-green-500 text-green-500 hover:bg-green-100",
    yellow: "border-yellow-500 text-yellow-500 hover:bg-yellow-100",
    red: "border-red-500 text-red-500 hover:bg-red-100",
  };

  return cn(
    base,
    coin >= minCoin ? enabled[color as keyof typeof enabled] : disabled,
  );
};

export default function Betting() {
  const { coin, setBet, setCoin, setScore } = useScoreStore();
  const { setPhase, phase } = usePhaseStore();
  const { session, isLoading } = useSupabaseAuth();
  const hasFetched = useRef(false);

  const handleBetting = (bet: number) => {
    setBet(bet);
    setPhase("poker");
  };

  useEffect(() => {
    if (isLoading) return;

    if (session && !hasFetched.current) {
      hasFetched.current = true;

      fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS}/checkOrCreateScore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ uid: session.user.id }),
      })
        .then((res) => res.json())
        .then((data) => setCoin(data.total_score));
    } else if (session === null && coin === 0) {
      hasFetched.current = true;
      setCoin(10000);
    }
  }, [session, isLoading]);

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
                src={betImg}
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
