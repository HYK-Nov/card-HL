import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { useModeStore } from "@/stores/mode.store.ts";

type Props = {
  onNext: () => void;
};

export default function StartScreen({ onNext }: Props) {
  const { toggleEasyMode, isEasyMode } = useModeStore();
  const handleNext = () => {
    onNext();
  };

  // TODO
  return (
    <>
      <div className={"flex h-full flex-col items-center justify-center gap-5"}>
        {/* 로고 */}
        <div>
          <p className={"text-6xl font-black"}>CARD HL</p>
        </div>
        {/* 시작 버튼 */}
        <div>
          <button
            onClick={handleNext}
            className={
              "rounded border-2 border-blue-500 bg-white px-16 py-1 text-xl font-bold text-blue-500 hover:bg-blue-100"
            }
          >
            시작하기
          </button>
        </div>
        {/* 유틸 버튼 */}
        <div>
          <div className={"flex items-center space-x-2"}>
            <Switch
              id={"easy-mode"}
              checked={isEasyMode}
              onCheckedChange={toggleEasyMode}
            />
            <Label htmlFor={"easy-mode"}>이지 모드</Label>
          </div>
        </div>
      </div>
    </>
  );
}
