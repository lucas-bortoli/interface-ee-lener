import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import requestBluetoothPermission from "./requestPermission";
import { BleManager, Device, State } from "react-native-ble-plx";
import connectToDevice from "./connectToDevice";
import { ToastAndroid } from "react-native";

interface BTDisconnected {
  bleManager: BleManager | null;
  status: "DISCONNECTED";
  device: null;
  connect(): Promise<boolean>;
}

interface BTConnected {
  bleManager: BleManager;
  status: "CONNECTED";
  device: Device;
  disconnect(): Promise<void>;
}

export type BluetoothContext = BTConnected | BTDisconnected;

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

  let btObject: BluetoothContext;

  if (btDevice === null) {
    btObject = {
      bleManager: bleManager,
      status: "DISCONNECTED",
      device: null,
      connect: async () => {
        const fail = (message: string) => {
          ToastAndroid.showWithGravity(message, 3000, ToastAndroid.BOTTOM);
          setBtDevice(null);
          return false;
        };

        if (bleManager === null || (await bleManager.state()) !== State.PoweredOn)
          return fail("A conexão Bluetooth não está disponível.");

        if ((await requestBluetoothPermission()) === false)
          return fail("A permissão de Bluetooth não foi obtida.");

        const device = await connectToDevice(bleManager);

        if (!device) return fail("Dispositivo não encontrado.");

        device.onDisconnected((error, device) => {
          console.info(`Bluetooth device ${device.id} disconnected, error=`, error);

          setBtDevice(null);
        });

        setBtDevice(device);

        return true;
      }
    };
  } else {
    btObject = {
      bleManager: bleManager!,
      status: "CONNECTED",
      device: btDevice,
      disconnect: async () => {
        await btDevice?.cancelConnection();
        setBtDevice(null);
      }
    };
  }

  return <btContext.Provider value={btObject}>{props.children}</btContext.Provider>;
};
