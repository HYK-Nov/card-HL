import { useNavigate } from "react-router";
import { TiArrowBack, TiHome } from "react-icons/ti";
import { usePhaseStore } from "@/stores/state.store.ts";

export default function Bottom() {
  const navigate = useNavigate();
  const { phase, setPhase } = usePhaseStore();

  const handleBack = () => {
    if (["poker", "highlow"].includes(phase)) {
      setPhase("betting");
    } else {
      navigate("/");
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className={
          "flex justify-between rounded border bg-white/60 p-2 backdrop-blur-xs"
        }
      >
        <button onClick={handleBack}>
          <TiArrowBack className="size-7" />
        </button>
        <button onClick={handleHome}>
          <TiHome className="size-7" />
        </button>
      </div>
    </>
  );
}
