import { PropsWithChildren, createContext, useMemo, useState } from "react";
import requestBluetoothPermission from "./requestPermission";
import { BleManager, Device } from "react-native-ble-plx";
import connectToDevice from "./connectToDevice";
import { ToastAndroid } from "react-native";

interface BTDisconnected {
  bleManager: BleManager | null;
  isConnected: false;
  connect(): Promise<boolean>;
}

interface BTConnected {
  bleManager: BleManager;
  isConnected: true;
  currentPwm: number;
  weightL: number;
  weightR: number;
  disconnect(): Promise<void>;
  setCurrentPwm(newValue: number): Promise<void>;
  saveMese(): Promise<void>;
}

type BluetoothContext = BTConnected | BTDisconnected;

const btContext = createContext<BluetoothContext | null>(null);

export const BluetoothProvider = (props: PropsWithChildren) => {
  const bleManager = useMemo(() => {
    try {
      return new BleManager();
    } catch (error) {
      console.error("Failed to create Bluetooth Manager.", error);
      ToastAndroid.showWithGravity(
        "Houve um erro ao inicializar a lógica de Bluetooth.",
        3000,
        ToastAndroid.BOTTOM
      );

      return null;
    }
  }, []);

  const [btDevice, setBtDevice] = useState<Device | null>(null);
  const [btConnected, setBtConnected] = useState(false);
  const [btPwm, setBtPwm] = useState(0);
  const [btWeightL, setBtWeightL] = useState(0);
  const [btWeightR, setBtWeightR] = useState(0);

  const resetDataValues = () => {
    setBtPwm(0);
    setBtWeightL(0);
    setBtWeightR(0);
  };

  let btObject: BluetoothContext;

  if (bleManager !== null && btConnected) {
    btObject = {
      bleManager: bleManager,
      isConnected: true,
      currentPwm: btPwm,
      weightL: btWeightL,
      weightR: btWeightR,
      disconnect: async () => {
        resetDataValues();
        setBtConnected(false);
        await btDevice?.cancelConnection();
      },
      saveMese: async () => {},
      setCurrentPwm: async () => {}
    };
  } else {
    btObject = {
      bleManager: bleManager,
      isConnected: false,
      connect: async () => {
        resetDataValues();
        setBtConnected(false);

        if (bleManager === null) {
          ToastAndroid.showWithGravity(
            "A conexão Bluetooth não está disponível.",
            3000,
            ToastAndroid.BOTTOM
          );

          return false;
        }

        const gotPermission = await requestBluetoothPermission();

        if (!gotPermission) {
          return false;
        }

        const device = await connectToDevice(bleManager);

        if (!device) {
          return false;
        }

        resetDataValues();
        setBtDevice(device);
        setBtConnected(true);

        device.onDisconnected((error, device) => {
          console.info(`Bluetooth device ${device.id} disconnected, error=`, error);
          resetDataValues();
          setBtConnected(false);
        });

        return true;
      }
    };
  }

  return <btContext.Provider value={btObject}>{props.children}</btContext.Provider>;
};
