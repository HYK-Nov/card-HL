import { cn } from "@/lib/utils.ts";
import { useHandStore } from "@/stores/score.store.ts";
import { THandRanking } from "@/types/pokerTypes.ts";

const HAND_RANKINGS: THandRanking[] = [
  { name: "로열 스트레이트 플러시", multiplier: 100 },
  { name: "파이브카드", multiplier: 30 },
  { name: "스트레이트 플러시", multiplier: 15 },
  { name: "포카드", multiplier: 10 },
  { name: "풀하우스", multiplier: 5 },
  { name: "플러시", multiplier: 4 },
  { name: "스트레이트", multiplier: 2 },
  { name: "트리플", multiplier: 1 },
  { name: "투페어", multiplier: 1 },
];

export default function HandRankings() {
  const { bestHand } = useHandStore();
  const [top, ...rest] = HAND_RANKINGS;
  const left = rest.slice(0, 4);
  const right = rest.slice(4);

  const renderList = (list: THandRanking[]) =>
    list.map(({ name, multiplier }) => (
      <div
        key={name}
        className={cn(
          "flex items-center justify-between gap-5 rounded border-3 border-transparent px-2 py-1 transition-all",
          {
            "border-rose-500 font-bold text-rose-500": bestHand?.name === name,
          },
        )}
      >
        <p>{name}</p>
        <p>x{multiplier}</p>
      </div>
    ));

  return (
    <div
      className={cn(
        "grid -translate-y-1 grid-cols-2 gap-x-10 gap-y-2 rounded bg-white px-5 py-2 text-wrap",
      )}
    >
      <div className="col-span-2 flex justify-center gap-3">
        <p>{top.name}</p>
        <p>x{top.multiplier}</p>
      </div>
      <div className="grid grid-flow-col grid-rows-4 gap-1">
        {renderList(left)}
      </div>
      <div className="grid grid-flow-col grid-rows-4 gap-1">
        {renderList(right)}
      </div>
    </div>
  );
}
