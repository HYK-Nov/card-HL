import TrumpCard from "@/components/poker/TrumpCard.tsx";
import { useEffect, useState } from "react";
import { getBestHand, getRandomCards } from "@/features/card/Card.ts";
import { useModeStore } from "@/stores/mode.store.ts";

export default function Poker() {
  const { isEasyMode } = useModeStore();
  const [deck, setDeck] = useState<string[]>([]);
  const [result, setResult] = useState<{ name: string; multiplier: number }>();
  const [isChanged, setIsChanged] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const toggleSelect = (index: number) => {
    setSelectedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  useEffect(() => {
    setDeck(getRandomCards());
  }, []);

  const handleClick = () => {
    if (!isChanged) {
      if (selectedIndices.length > 0) {
        let temp = getRandomCards(selectedIndices.length);

        // 중복된 카드가 있을 경우, 다시 뽑기
        while (temp.some((card) => deck.includes(card))) {
          temp = getRandomCards(selectedIndices.length); // 중복이 있으면 다시 뽑음
        }

        // selectedIndices를 기준으로 새로 뽑은 카드로 기존 카드 교체
        const newDeck = [...deck];
        selectedIndices.forEach((index, i) => {
          newDeck[index] = temp[i]; // selectedIndices의 자리만 temp로 대체
        });

        setDeck(newDeck);
        setSelectedIndices([]); // 선택된 인덱스 초기화
        setIsChanged(true);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (deck.length > 0) {
      setResult(getBestHand(deck, isEasyMode));
    }
  }, [deck]);

  return (
    <>
      <div className="flex flex-col gap-8 py-5">
        <div className="flex flex-col justify-center text-center">
          <p>결과</p>
          <p className={"text-3xl font-extrabold"}>{result && result.name}</p>
        </div>
        <div>
          <div className={"grid grid-cols-5 gap-3 px-20 pb-5"}>
            {deck.map((item, idx) => (
              <TrumpCard
                key={idx}
                value={item}
                selected={selectedIndices.includes(idx)}
                isChanged={isChanged}
                onClick={() => toggleSelect(idx)}
              />
            ))}
          </div>
          <div className={"flex justify-center"}>
            {!isChanged && (
              <button
                onClick={handleClick}
                className={
                  "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100"
                }
              >
                결정
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
