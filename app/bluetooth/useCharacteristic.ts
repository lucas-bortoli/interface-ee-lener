import { useEffect, useState } from "react";
import { BleErrorCode, Device } from "react-native-ble-plx";
import BluetoothUuids from "./uuids";
import { Buffer } from "buffer";

export const useCharacteristicInt = (
  device: Device | null,
  charUuid: string
): [number, (newVal: number, kind: "int" | "double") => void] => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (device === null) {
      return;
    }

    console.info(`Subscribing to characteristic ${charUuid}`);

    const subscription = device.monitorCharacteristicForService(
      BluetoothUuids.service,
      charUuid,
      (error, characteristic) => {
        if (error?.errorCode === BleErrorCode.OperationCancelled) {
          // silently stop
          return;
        }

        if (error !== null) {
          console.error(`Error while monitoring characteristic ${charUuid}:`, error);
          return;
        }

        if (characteristic === null) {
          console.error(
            `Error while monitoring characteristic ${charUuid}: characteristic is null`
          );
          return;
        }

        if (characteristic.value === null) {
          console.error(
            `Error while monitoring characteristic ${charUuid}: characteristic value is null`
          );
          return;
        }

        const value = Buffer.from(characteristic.value, "base64").readInt32LE(0);

        setValue(value);
      }
    );

    return () => {
      console.info(`Unmounting: stopping subscription to ${charUuid}`);
      subscription.remove();
    };
  }, [device]);

  const writeValueToDevice = async (newValue: number, kind: "int" | "double") => {
    if (device === null) {
      return false;
    }

    const buffer = Buffer.alloc(4);

    if (kind === "double") {
      buffer.writeDoubleLE(newValue);
    } else {
      buffer.writeInt32LE(newValue);
    }

    console.log("--> " + newValue);

    try {
      setValue(newValue);

      await device.writeCharacteristicWithoutResponseForService(
        BluetoothUuids.service,
        charUuid,
        buffer.toString("base64")
      );

      return true;
    } catch (error) {
      console.error("Failed to write characteristic", charUuid, buffer.toString("hex"));
      return false;
    }
  };

  return [value, writeValueToDevice];
};
