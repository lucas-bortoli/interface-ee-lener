export const makeFullUuid = (partial: string) => `${partial}-0000-1000-8000-00805f9b34fb`;

export const UUIDs = {
  service: makeFullUuid("fff0"),
  characteristicPwm: makeFullUuid("fff1"),
  characteristicMese: makeFullUuid("fff2"),
  characteristicWeightL: makeFullUuid("fffa"),
  characteristicWeightR: makeFullUuid("fffb")
};
