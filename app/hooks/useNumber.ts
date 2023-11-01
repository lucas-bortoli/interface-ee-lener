import { useState } from "react";

export function useNumber(
  initial: number,
  { min, max }: { min?: number; max?: number }
): [number, (n: number) => void] {
  const [n, setN] = useState(initial);

  return [n, (newVal: number) => {
    if (min !== undefined && newVal < min) {
      newVal = min;
    }

    if (max !== undefined && newVal > max) {
      newVal = max;
    }

    setN(newVal);
  }];
}
