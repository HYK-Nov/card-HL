import { usePhaseStore } from "@/stores/state.store.ts";
import { useScoreStore } from "@/stores/score.store.ts";
import { BiExit } from "react-icons/bi";
import { Link } from "react-router";

export default function Header() {
  const { setPhase } = usePhaseStore();
  const { setScore } = useScoreStore();

  const handleChangeBettingPhase = () => {
    setPhase("betting");
    setScore(0);
  };

  return (
    <header className="flex h-[60px] w-full items-center justify-between text-lg">
      <Link to={"/"}>
        <button className={"text-2xl"}>Card HL</button>
      </Link>
      <BiExit
        className={
          "size-11 cursor-pointer rounded-full p-1.5 hover:bg-neutral-600/20"
        }
        onClick={handleChangeBettingPhase}
      />
    </header>
  );
}
