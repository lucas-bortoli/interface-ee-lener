import { Device } from "react-native-ble-plx";
import { useCharacteristicInt } from "./useCharacteristic";
import BluetoothUuids from "./uuids";

export const ControlCodes = {
  _Sync: 0x00,
  ResetPwmImmediate: 0x80,
  DecreasePwmStep: 0x81,
  IncreasePwmStep: 0x82,
  ResetPwmGradual: 0x83,
  CollectAverageWeight: 0x8a,
  SaveMese: 0x90,
  DecreaseMeseMaxStep: 0xa1,
  IncreaseMeseMaxStep: 0xa2,
  SetSetpoint: 0xb1
};

export function useControlCharacteristic(device: Device) {
  const [_, write] = useCharacteristicInt(device, BluetoothUuids.characteristicControl);

  const publicWrite = async (controlCode: number, extraData: number = 0) => {
    controlCode = controlCode & 0xff;
    extraData = extraData & 0xff;

    console.log(
      `Send control ${controlCode.toString(16).padStart(2, "0")}, extraData ${extraData}`
    );

    const payload = (controlCode << 8) | extraData;

    await write(payload, "int");
  };

  return publicWrite;
}
