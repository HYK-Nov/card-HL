import { usePhaseStore } from "@/stores/state.store.ts";
import { useScoreStore } from "@/stores/score.store.ts";
import { BiExit } from "react-icons/bi";

export default function Header() {
  const { setPhase } = usePhaseStore();
  const { setScore } = useScoreStore();

  const handleOnClick = () => {
    window.location.reload();
    // onRetry();
  };
  const handleChangeBettingPhase = () => {
    setPhase("betting");
    setScore(0);
  };

  return (
    <header className="flex h-[60px] w-full items-center justify-between text-lg">
      <button className={"text-2xl"} onClick={handleOnClick}>
        Card HL
      </button>
      <BiExit
        className={
          "size-11 cursor-pointer rounded-full p-1.5 hover:bg-neutral-600/20"
        }
        onClick={handleChangeBettingPhase}
      />
    </header>
  );
}
