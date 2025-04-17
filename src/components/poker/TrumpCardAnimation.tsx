import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { parsedCardImages } from "@/components/poker/TrumpCard.tsx";

type Props = {
  value: string;
};

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function TrumpCardAnimation({ value }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentValue, setCurrentValue] = useState(value); // 현재 카드 값 저장

  const prevValue = usePrevious(value);

  useEffect(() => {
    if (prevValue !== value) {
      setIsFlipped(true);
      const timer = setTimeout(() => {
        setCurrentValue(value);
        setIsFlipped(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div
      className={cn(
        "group relative aspect-[63/88] w-[128px] cursor-pointer shadow-xl",
        "perspective-1000", // 퍼스펙티브 추가 (회전 효과를 3D로 보이게 하기 위해)
      )}
    >
      <div
        className={cn(
          "absolute h-full w-full -scale-x-100 transition-transform duration-500",
          "transform-style-preserve-3d", // 3D 효과를 적용하려면 이 속성 필요
          isFlipped ? "rotate-y-180" : "rotate-y-0", // 플립 상태
        )}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={parsedCardImages[currentValue]} // currentValue를 사용하여 카드 이미지 표시
            alt="TrumpCard"
            draggable="false"
            className="h-full w-full rounded object-cover"
          />
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 flex rotate-y-180 items-center justify-center bg-gray-800 text-xl font-bold text-white backface-hidden">
          <img
            src={parsedCardImages[currentValue]}
            alt="TrumpCard"
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
