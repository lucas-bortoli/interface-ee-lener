import { BleManager, Device, ScanCallbackType, ScanMode } from "react-native-ble-plx";
import BluetoothUuids from "./uuids";
import { timeout } from "../utils/timeout";
import { ToastAndroid } from "react-native";

async function findDevice(bleManager: BleManager): Promise<Device | null> {
  const scanStartTime = Date.now();

  let foundDevice: Device | null = null;

  bleManager.startDeviceScan(
    [BluetoothUuids.service],
    { scanMode: ScanMode.LowLatency, callbackType: ScanCallbackType.FirstMatch },
    (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      console.log(`Finally found a device with our service UUID! ${device!.id}`);

      ToastAndroid.showWithGravity(
        "Um dispositivo compatível foi encontrado!",
        1000,
        ToastAndroid.BOTTOM
      );

      // If it matches our custom service UUID then that's that
      foundDevice = device;
    }
  );

  while (foundDevice === null && (Date.now() - scanStartTime) < 15000) {
    // Go do something else while we wait for the bluetooth device to show up
    await timeout(500);
  }

  if (foundDevice === null) {
    console.warn(`Gave up waiting for device.`);

    ToastAndroid.showWithGravity(
      "O dispositivo não foi encontrado.",
      3000,
      ToastAndroid.BOTTOM
    );
  }

  bleManager.stopDeviceScan();

  return foundDevice;
}

/**
 * Scans for a compatible device, and connects to it. If a device is not found,
 * or there is an error connecting to it, this function resolves to null.
 * @returns the connected device, or null if not connected.
 */
export default async function connectToDevice(bleManager: BleManager): Promise<Device | null> {
  const foundDevice = await findDevice(bleManager);

  if (!foundDevice) {
    return null;
  }

  try {
    return await foundDevice.connect();
  } catch (error) {
    ToastAndroid.showWithGravity(
      "Houve um erro ao conectar ao dispositivo.",
      3000,
      ToastAndroid.BOTTOM
    );

    console.error(error);

    return null;
  }
}
