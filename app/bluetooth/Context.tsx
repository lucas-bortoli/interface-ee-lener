import { PropsWithChildren, createContext, useState } from "react";
import { UUIDs } from "./uuid";

interface BTDisconnected {
  isConnected: false;
  connect(): Promise<void>;
}

interface BTConnected {
  isConnected: true;
  disconnect(): Promise<void>;

  currentPwm: number;
  setCurrentPwm(newValue: number): Promise<void>;

  saveMese(): Promise<void>;

  weightL: number;
  weightR: number
}

type BluetoothContext = BTConnected | BTDisconnected;

const btContext = createContext<BluetoothContext | null>(null);

export const BluetoothProvider = (props: PropsWithChildren) => {
  const [btConnected, btSetConnected] = useState(false);

  const [btPwm, setBtPwm] = useState(0);

  const [btWeightL, setBtWeightL] = useState(0);
  const [btWeightR, setBtWeightR] = useState(0);

  let btObject: BluetoothContext;

  if (btConnected) {
    btObject = {
      isConnected: true,
      currentPwm: btPwm,
      weightL: btWeightL,
      weightR: btWeightR,
      disconnect: async () => {
        setBtPwm(0);
        setBtWeightL(0);
        setBtWeightR(0);
        btSetConnected(false);
      },
      saveMese: async () => {},
      setCurrentPwm: async () => {}
    }
  } else {
    btObject = {
      isConnected: false,
      connect: async () => {

      }
    }
  }

  return <btContext.Provider value={btObject}>
    {props.children}
  </btContext.Provider>
}
