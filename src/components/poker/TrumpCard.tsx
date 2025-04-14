import { cn } from "@/lib/utils.ts";
import React from "react";

const cardImages = import.meta.glob("@/assets/images/card/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type Props = {
  selected: boolean;
  onClick: () => void;
  value: string;
  isChanged: boolean;
};

const parsedCardImages: Record<string, string> = {};
Object.entries(cardImages).forEach(([fullPath, url]) => {
  const fileName = fullPath.split("/").pop()?.replace(".svg", "") || "";
  parsedCardImages[fileName] = url;
});

export default React.memo(function TrumpCard({
  selected,
  onClick,
  value,
  isChanged,
}: Props) {
  return (
    <>
      <button
        disabled={isChanged}
        className={cn(
          "group relative aspect-[63/88] overflow-hidden rounded-md bg-white shadow-xl transition",
          selected ? "-translate-y-3" : "translate-y-0",
        )}
        onClick={onClick}
      >
        <img
          src={parsedCardImages[value]}
          alt="TrumpCard"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={cn(
            "absolute inset-0 rounded bg-slate-400/40 opacity-0 transition-opacity",
            selected && "opacity-100",
            !isChanged && "group-hover:opacity-100",
            isChanged && "cursor-default",
          )}
        />
        <p
          className={cn(
            "absolute inset-0 items-center justify-center text-xl font-bold text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)]",
            selected ? "flex" : "hidden",
          )}
        >
          CHANGE
        </p>
      </button>
    </>
  );
});
