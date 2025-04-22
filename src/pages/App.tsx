import "../styles/App.css";
import Poker from "@/pages/Poker.tsx";
import { useEffect } from "react";
import StartScreen from "@/pages/StartScreen.tsx";
import HighLow from "@/pages/HighLow.tsx";
import ScoreSection from "@/components/common/ScoreSection.tsx";
import Ranking from "@/pages/Ranking.tsx";
import { usePhaseStore } from "@/stores/state.store.ts";
import { useHandStore } from "@/stores/score.store.ts";
import Betting from "@/pages/Betting.tsx";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Bottom from "@/components/common/Bottom.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

function App() {
  const { phase, setPhase } = usePhaseStore();
  const { setBestHand } = useHandStore();
  const { pathname } = useLocation();

  useEffect(() => {
    if (["start", "poker"].includes(phase)) {
      setBestHand(null);
    }
  }, [phase]);

  useEffect(() => {
    setPhase("betting");
  }, []);

  return (
    <>
      <div className={"@container mx-auto flex max-w-3xl flex-col px-[1rem]"}>
        <Routes>
          {/* start */}
          <Route path={"/"} element={<StartScreen />} />
          {/* Main Page */}
          <Route
            path={"/game"}
            element={
              <>
                <div className="flex h-screen flex-col gap-3 pt-5 pb-[80px]">
                  <ScoreSection />
                  {/* phase 값에 따라 다른 화면 표시 */}
                  {phase === "betting" && <Betting />}
                  {phase === "poker" && <Poker />}
                  {phase === "highlow" && <HighLow />}
                </div>
              </>
            }
          />
          <Route path={"/ranking"} element={<Ranking />} />
          {/* Redirect to /game by default */}
          <Route path="*" element={<Navigate to="/game" />} />
        </Routes>
        <div
          className={
            "@container fixed right-0 bottom-0 left-0 mx-auto mb-4 max-w-3xl px-[1rem]"
          }
        >
          {pathname !== "/" && <Bottom />}
        </div>
      </div>
      <Toaster position={"top-center"} duration={2000} richColors />
    </>
  );
}

export default App;
