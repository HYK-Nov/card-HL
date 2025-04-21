import "../styles/App.css";
import Poker from "@/pages/Poker.tsx";
import Header from "@/components/common/Header.tsx";
import { useEffect } from "react";
import StartScreen from "@/pages/StartScreen.tsx";
import HighLow from "@/pages/HighLow.tsx";
import ScoreSection from "@/components/common/ScoreSection.tsx";
import ResultScreen from "@/pages/ResultScreen.tsx";
import { usePhaseStore } from "@/stores/state.store.ts";
import { useHandStore } from "@/stores/score.store.ts";
import Betting from "@/pages/Betting.tsx";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const { phase, setPhase } = usePhaseStore();
  const { setBestHand } = useHandStore();

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
      <div
        className={
          "@container mx-auto flex h-screen max-w-3xl flex-col gap-2 px-[1rem] pb-5"
        }
      >
        <Routes>
          {/* start */}
          <Route path={"/"} element={<StartScreen />} />
          {/* Main Page */}
          <Route
            path={"/game"}
            element={
              <>
                <div className="flex flex-col gap-2">
                  <Header />
                  <ScoreSection />
                  {/* phase 값에 따라 다른 화면 표시 */}
                  {phase === "betting" && <Betting />}
                  {phase === "poker" && <Poker />}
                  {phase === "highlow" && <HighLow />}
                </div>
              </>
            }
          />
          <Route path={"/ranking"} element={<ResultScreen />} />
          {/* Redirect to /game by default */}
          <Route path="*" element={<Navigate to="/game" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
