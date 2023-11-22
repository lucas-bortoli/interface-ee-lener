import { router } from "expo-router";
import { useEffect } from "react";

export function useHeaderTitle(title: string) {
  useEffect(() => {
    setTimeout(() => {
      router.setParams({ title });
    }, 0);
  }, [title]);
}
