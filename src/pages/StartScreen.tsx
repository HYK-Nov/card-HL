import { usePhaseStore } from "@/stores/state.store.ts";
import { BiLogoGithub, BiSolidTrophy } from "react-icons/bi";
import { useSupabaseAuth } from "@/components/common/SupabaseAuthProvider.tsx";
import googleIcon from "@/assets/images/google.svg";
import { useEffect, useRef } from "react";
import { useScoreStore } from "@/stores/score.store.ts";

export default function StartScreen() {
  const { session, signIn, signOut } = useSupabaseAuth();
  const { setPhase } = usePhaseStore();
  const { setCoin } = useScoreStore();
  const hasFetched = useRef(false);

  const handleNext = () => {
    setPhase("betting");
  };
  const handleResult = () => {
    setPhase("result");
  };
  const handleGithub = () => {
    window.open("https://github.com/HYK-Nov/card-HL", "_blank");
  };

  useEffect(() => {
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
    }
  }, [session]);

  // TODO
  return (
    <>
      <div className={"flex h-full flex-col items-center justify-center gap-5"}>
        <div className={"flex w-full justify-between space-x-2"}>
          <BiSolidTrophy
            onClick={handleResult}
            className="size-10 cursor-pointer text-amber-400"
          />

          <BiLogoGithub
            onClick={handleGithub}
            className={"size-10 cursor-pointer"}
          />
        </div>
        {/* 로고 */}
        <div>
          <p className={"GmarketSans text-6xl font-black"}>CARD HL</p>
        </div>
        {/* 시작 버튼 */}
        <div>
          <button
            onClick={handleNext}
            className={
              "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100"
            }
          >
            시작하기
          </button>
        </div>
        {/* 유틸 버튼 */}
        <div>
          <button
            onClick={session ? signOut : signIn}
            className={
              "flex items-center gap-2.5 rounded-full border px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100"
            }
          >
            <img src={googleIcon} alt={""} className={"size-6"} />
            <p>{session?.user.email || "구글 로그인"}</p>
          </button>
        </div>
      </div>
    </>
  );
}
