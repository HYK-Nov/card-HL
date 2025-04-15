import { useEffect, useState } from "react";
import { cn } from "@/lib/utils.ts";
import { parsedCardImages } from "@/components/poker/TrumpCard.tsx";

type Props = {
  value: string;
};

export default function TrumpCardAnimation({ value }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentValue, setCurrentValue] = useState(value); // 현재 카드 값 저장

  // value가 변경되면 한 번만 카드를 뒤집기
  useEffect(() => {
    if (value !== currentValue) {
      setIsFlipped(true); // value가 변경되면 카드 뒤집기
      const timer = setTimeout(() => {
        setCurrentValue(value); // currentValue를 새 value로 업데이트
        setIsFlipped(false); // 뒤집힌 후에 원래 상태로 돌아오기
      }, 500); // 500ms 뒤에 원래 상태로 돌아오기

      return () => clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머 정리
    }
  }, [value, currentValue]); // value가 변경될 때마다 한 번만 뒤집기

  return (
    <div
      className={cn(
        "group relative aspect-[63/88] w-[128px] cursor-pointer shadow-xl",
        "perspective-1000", // 퍼스펙티브 추가 (회전 효과를 3D로 보이게 하기 위해)
      )}
    >
      <div
        className={cn(
          "absolute h-full w-full transition-transform duration-500",
          "transform-style-preserve-3d", // 3D 효과를 적용하려면 이 속성 필요
          isFlipped ? "rotate-y-180" : "rotate-y-0", // 플립 상태
        )}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={parsedCardImages[currentValue]} // currentValue를 사용하여 카드 이미지 표시
            alt="TrumpCard"
            className="h-full w-full rounded object-cover"
          />
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 flex rotate-y-180 items-center justify-center bg-gray-800 text-xl font-bold text-white backface-hidden">
          <img
            src={parsedCardImages[currentValue]}
            alt="TrumpCard"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
