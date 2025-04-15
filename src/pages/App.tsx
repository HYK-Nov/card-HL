import "../styles/App.css";
import Poker from "@/pages/Poker.tsx";
import HandRankings from "@/components/poker/HandRankings.tsx";
import Header from "@/components/common/Header.tsx";
import { useState } from "react";
import StartScreen from "@/pages/StartScreen.tsx";
import HighLow from "@/pages/HighLow.tsx";
import ScoreSection from "@/components/common/ScoreSection.tsx";
import ResultScreen from "@/pages/ResultScreen.tsx";

type GamePhase = "start" | "poker" | "highlow" | "result";

function App() {
  const [phase, setPhase] = useState<GamePhase>("start");

  const goToPoker = () => setPhase("poker");
  const goToHighLow = () => setPhase("highlow");
  const restart = () => setPhase("start");
  const goToResult = () => setPhase("result");

  return (
    <>
      <div className={"GmarketSans"}>
        <div
          className={
            "@container mx-auto flex h-screen max-w-3xl flex-col gap-2 px-[1rem] pb-5"
          }
        >
          {phase === "start" && <StartScreen onNext={goToPoker} />}

          {phase !== "start" && (
            <div className={"flex flex-col gap-2"}>
              <Header onRetry={restart} />
              <ScoreSection />
              <HandRankings />
            </div>
          )}

          {phase === "poker" && <Poker onNext={goToHighLow} />}
          {phase === "highlow" && <HighLow onRetry={restart} />}
          {phase === "result" && <ResultScreen />}
        </div>
      </div>
    </>
  );
}

export default App;
