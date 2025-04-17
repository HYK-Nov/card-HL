import "../styles/App.css";
import Poker from "@/pages/Poker.tsx";
import Header from "@/components/common/Header.tsx";
import { useEffect } from "react";
import StartScreen from "@/pages/StartScreen.tsx";
import HighLow from "@/pages/HighLow.tsx";
import ScoreSection from "@/components/common/ScoreSection.tsx";
import ResultScreen from "@/pages/ResultScreen.tsx";
import { usePhaseStore } from "@/stores/state.store.ts";
import { useHandStore, useScoreStore } from "@/stores/score.store.ts";
import Betting from "@/pages/Betting.tsx";

function App() {
  const { phase } = usePhaseStore();
  const { setBestHand } = useHandStore();
  const { setCoin } = useScoreStore();

  useEffect(() => {
    setCoin(10000);
  }, []);

  useEffect(() => {
    if (["start", "poker"].includes(phase)) {
      setBestHand(null);
    }
    if (phase === "start") {
      setCoin(10000);
    }
  }, [phase]);

  return (
    <>
      <div className={"GmarketSans"}>
        <div
          className={
            "@container mx-auto flex h-screen max-w-3xl flex-col gap-2 px-[1rem] pb-5"
          }
        >
          {phase === "start" && <StartScreen />}

          <div className={"flex flex-col gap-2"}>
            {phase !== "start" && <Header />}
            {!["start", "result"].includes(phase) && <ScoreSection />}
          </div>

          {phase === "betting" && <Betting />}
          {phase === "poker" && <Poker />}
          {phase === "highlow" && <HighLow />}
          {phase === "result" && <ResultScreen />}
        </div>
      </div>
    </>
  );
}

export default App;
