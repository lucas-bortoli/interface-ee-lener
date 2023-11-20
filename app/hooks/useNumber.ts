import { useState } from "react";
import { clamp } from "../utils/clamp";

export function useNumber(
  initial: number,
  { min, max }: { min: number; max: number }
): [number, (n: number) => void] {
  const [n, setN] = useState(initial);

  return [
    n,
    (newVal: number) => {
      setN(clamp(min, newVal, max));
    }
  ];
}
