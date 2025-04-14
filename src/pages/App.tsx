import "../styles/App.css";
import Poker from "@/pages/Poker.tsx";
import HandRankings from "@/components/poker/HandRankings.tsx";

function App() {
  return (
    <>
      <div className={"bg-blue-500"}>
        <div className="mx-auto flex h-[50px] max-w-3xl items-center">
          <p>HEADER</p>
        </div>
        <div
          className={
            "@container mx-auto h-[calc(100vh-50px)] max-w-3xl overflow-hidden px-[1rem] pb-5"
          }
        >
          <HandRankings />
          <Poker />
        </div>
      </div>
    </>
  );
}

export default App;
