import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
};

export default function RollingNumber({ value }: Props) {
  const [displayValue, setDisplayValue] = useState(value);
  const currentValueRef = useRef(value);
  const rafRef = useRef<number>();

  useEffect(() => {
    const update = () => {
      const current = currentValueRef.current;

      if (current === value) {
        cancelAnimationFrame(rafRef.current!);
        return;
      }

      const direction = value > current ? 1 : -1;
      const next =
        current + direction * Math.min(100, Math.abs(value - current));

      currentValueRef.current = next;
      setDisplayValue(next);

      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafRef.current!);
  }, [value]);

  return <span>{displayValue}</span>;
}
