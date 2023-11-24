import { fullUUID } from "react-native-ble-plx";

const BluetoothUuids = {
  service: fullUUID("bbbb"),
  characteristicPwm: fullUUID("fff1"),
  characteristicMese: fullUUID("fff2"),
  characteristicWeightL: fullUUID("fffa"),
  characteristicWeightR: fullUUID("fffb"),
  characteristicControl: fullUUID("fff8")
};

export default BluetoothUuids;
