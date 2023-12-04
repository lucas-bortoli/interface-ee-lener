import { fullUUID } from "react-native-ble-plx";

const BluetoothUuids = {
  service: fullUUID("abb4"),
  characteristicPwm: fullUUID("ff01"),
  characteristicWeightL: fullUUID("ff03"),
  characteristicWeightR: fullUUID("ff04"),
  characteristicAverageCollectedWeight: fullUUID("ff15"),
  characteristicControl: fullUUID("ff0f"),
  characteristicMese: fullUUID("ff05"),
  characteristicMeseMax: fullUUID("ff06"),
  characteristicSetpoint: fullUUID("ff07")
};

console.log("Bluetooth UUIDs", BluetoothUuids);

export default BluetoothUuids;
