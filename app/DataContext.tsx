import { PropsWithChildren, createContext, useContext, useState } from "react";

type UseState<T> = [number, (newVal: T) => void];

interface AppData {
  parallelCollectedWeight: UseState<number>;
}

const DataContext = createContext<AppData | null>(null);
export const useDataContext = () => useContext(DataContext)!;

export const DataProvider = (props: PropsWithChildren) => {
  const data: AppData = {
    parallelCollectedWeight: useState<number>(0)
  };

  return <DataContext.Provider value={data}>{props.children}</DataContext.Provider>;
};
