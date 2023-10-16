import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import requestBluetoothPermission from "./requestPermission";
import { BleManager, Device, State } from "react-native-ble-plx";
import connectToDevice from "./connectToDevice";
import { ToastAndroid } from "react-native";
import BluetoothUuids from "./uuids";
import { useCharacteristic, useCharacteristicInt } from "./useCharacteristic";

interface BTDisconnected {
  bleManager: BleManager | null;
  status: "DISCONNECTED";
  connect(): Promise<boolean>;
}

interface BTConnecting {
  bleManager: BleManager;
  status: "CONNECTING";
}

interface BTConnected {
  bleManager: BleManager;
  status: "CONNECTING" | "CONNECTED";
  currentPwm: number;
  weightL: number;
  weightR: number;
  disconnect(): Promise<void>;
  setCurrentPwm(newValue: number): Promise<void>;
  saveMese(): Promise<void>;
}

export type BluetoothContext = BTConnected | BTConnecting | BTDisconnected;

const btContext = createContext<BluetoothContext | null>(null);

export const useBluetoothConnection = () => useContext(btContext)!;

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
  const [btStatus, setBtStatus] = useState<BluetoothContext["status"]>("DISCONNECTED");

  /*
  const [btPwm, setBtPwm] = useState(0);
  const [btWeightL, setBtWeightL] = useState(0);
  const [btWeightR, setBtWeightR] = useState(0);
  */

  const [btPwm, setBtPwm] = useCharacteristicInt(
    btDevice,
    BluetoothUuids.characteristicPwm
  );

  const [btWeightL, setBtWeightL] = useCharacteristicInt(
    btDevice,
    BluetoothUuids.characteristicWeightL
  );

  const [btWeightR, setBtWeightR] = useCharacteristicInt(
    btDevice,
    BluetoothUuids.characteristicWeightR
  );

  let btObject: BluetoothContext;

  if (btStatus === "DISCONNECTED") {
    btObject = {
      bleManager: bleManager,
      status: "DISCONNECTED",
      connect: async () => {
        if (bleManager === null || (await bleManager.state()) !== State.PoweredOn) {
          ToastAndroid.showWithGravity(
            "A conexão Bluetooth não está disponível.",
            3000,
            ToastAndroid.BOTTOM
          );

          return false;
        }

        setBtStatus("CONNECTING");

        const gotPermission = await requestBluetoothPermission();

        if (!gotPermission) {
          setBtStatus("DISCONNECTED");
          return false;
        }

        const device = await connectToDevice(bleManager);

        if (!device) {
          setBtStatus("DISCONNECTED");
          return false;
        }

        setBtDevice(device);
        setBtStatus("CONNECTED");

        device.onDisconnected((error, device) => {
          console.info(`Bluetooth device ${device.id} disconnected, error=`, error);
          setBtStatus("DISCONNECTED");
        });

        return true;
      }
    };
  } else if (btStatus === "CONNECTING") {
    btObject = {
      status: "CONNECTING",
      bleManager: bleManager!
    };
  } else {
    btObject = {
      bleManager: bleManager!,
      status: "CONNECTED",
      currentPwm: btPwm,
      weightL: btWeightL,
      weightR: btWeightR,
      disconnect: async () => {
        setBtStatus("DISCONNECTED");
        await btDevice?.cancelConnection();
      },
      saveMese: async () => {},
      setCurrentPwm: async () => {}
    };
  }

  return <btContext.Provider value={btObject}>{props.children}</btContext.Provider>;
};
