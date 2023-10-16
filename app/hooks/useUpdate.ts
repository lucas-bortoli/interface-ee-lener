import { useState } from "react"

export const useUpdate = () => {
  const [value, setValue] = useState(0);

  const trigger = () => {
    setValue(value + 1);
  };

  return trigger;
}
