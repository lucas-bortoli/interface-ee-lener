import { BleManager, Device, ScanMode } from "react-native-ble-plx";
import { timeout } from "../utils/timeout";
import { ToastAndroid } from "react-native";

const deviceInfo = (device: Device) => {
  return `${device!.name ?? "Unnamed"} - ${device.id}`;
};

const deviceMatches = (device: Device) => {
  return (device.name ?? "").includes("LILAT");
};

async function findDevice(bleManager: BleManager): Promise<Device | null> {
  const scanStartTime = Date.now();
  let foundDevice: Device | null = null;

  bleManager.startDeviceScan(null, { scanMode: ScanMode.LowLatency }, (error, newDevice) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.error("Error during device scan...", error);
      return;
    }

    if (deviceMatches(newDevice!)) {
      console.log(`* ${deviceInfo(newDevice!)}`);

      if (foundDevice === null) {
        ToastAndroid.showWithGravity(
          "Um dispositivo compatível foi encontrado!",
          1000,
          ToastAndroid.BOTTOM
        );

        // If it matches our custom service UUID then that's that
        foundDevice = newDevice;
      }
    } else {
      console.log(`- ${deviceInfo(newDevice!)}`);
    }
  });

  while (foundDevice === null && Date.now() - scanStartTime < 15000) {
    // Go do something else while we wait for the bluetooth device to show up
    await timeout(500);
  }

  bleManager.stopDeviceScan();

  if (foundDevice === null) {
    console.warn(`Gave up waiting for device.`);

    ToastAndroid.showWithGravity("O dispositivo não foi encontrado.", 3000, ToastAndroid.BOTTOM);
  } else {
    console.info(`Scan end, device: ${deviceInfo(foundDevice)}`);
  }

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
    return await foundDevice.connect({
      refreshGatt: "OnConnected"
    });
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
