const makeFullUuid = (partial: string) => `${partial}-0000-1000-8000-00805f9b34fb`;

const BluetoothUuids = {
  service: makeFullUuid("fff0"),
  characteristicPwm: makeFullUuid("fff1"),
  characteristicMese: makeFullUuid("fff2"),
  characteristicWeightL: makeFullUuid("fffa"),
  characteristicWeightR: makeFullUuid("fffb")
};

export default BluetoothUuids;
