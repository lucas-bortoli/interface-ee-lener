import { useEffect, useMemo, useState } from "react";
import { BleErrorCode, BleManager, Device } from "react-native-ble-plx";
import BluetoothUuids from "./uuids";
import { Buffer } from "buffer";
import { useUpdate } from "../hooks/useUpdate";

export const useCharacteristic = (
  device: Device | null,
  charUuid: string
): [Buffer, () => Promise<boolean>] => {
  const buffer = useMemo(() => Buffer.alloc(4), []);
  const update = useUpdate();

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

        buffer.fill(0);
        buffer.write(characteristic.value, 0, "base64");

        update();
      }
    );

    return () => {
      console.info("Unmounting: stopping subscription");
      buffer.fill(0);
      subscription.remove();
    };
  }, [device]);

  const writeBuffer = async () => {
    if (device === null) {
      return false;
    }

    try {
      console.info("Writing data to characteristic");
      await device.writeCharacteristicWithoutResponseForService(
        BluetoothUuids.service,
        charUuid,
        buffer.toString("base64")
      );
      console.info("Data written");
      update();
      return true;
    } catch (error) {
      console.error("Failed to write characteristic", charUuid, buffer.toString("hex"));
      update();
      return false;
    }
  };

  return [buffer, writeBuffer];
};

export const useCharacteristicInt = (
  device: Device | null,
  charUuid: string
): [number, (newVal: number) => void] => {
  const [buffer, writeBuffer] = useCharacteristic(device, charUuid);
  const int = buffer.readInt32LE(0);

  const writeInt = (val: number) => {
    buffer.fill(0);
    buffer.writeInt32LE(val);
    return writeBuffer();
  };

  return [int, writeInt];
};
