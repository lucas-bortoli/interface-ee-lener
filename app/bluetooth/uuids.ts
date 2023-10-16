import { fullUUID } from "react-native-ble-plx";

const BluetoothUuids = {
  service: fullUUID("abba"),
  characteristicPwm: fullUUID("fff1"),
  characteristicMese: fullUUID("fff2"),
  characteristicWeightL: fullUUID("fffa"),
  characteristicWeightR: fullUUID("fffb")
};

export default BluetoothUuids;
