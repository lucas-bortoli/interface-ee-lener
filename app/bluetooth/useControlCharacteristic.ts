import { Device } from "react-native-ble-plx";
import { useCharacteristicInt } from "./useCharacteristic";
import BluetoothUuids from "./uuids";
import { timeout } from "../utils/timeout";

export const ControlCodes = {
  _Sync: 0x00,
  ResetPwmImmediate: 0x80,
  DecreasePwmStep: 0x81,
  IncreasePwmStep: 0x82,
  ResetPwmGradual: 0x83,
  SaveMese: 0x90
};

export function useControlCharacteristic(device: Device) {
  const [_, write] = useCharacteristicInt(device, BluetoothUuids.characteristicControl);

  const publicWrite = async (data: number) => {
    console.log("Send control: " + data);
    await write(data, "int");
  };

  return publicWrite;
}
