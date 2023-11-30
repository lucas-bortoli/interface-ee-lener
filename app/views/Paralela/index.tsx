import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useCountdown } from "../../hooks/useCountdown";
import { useRef } from "react";
import { StatusDisplay } from "../../components/StatusDisplay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hapticFeedbackProcessEnd } from "../../haptics/HapticFeedback";
import { useBluetoothConnection } from "../../bluetooth/Context";
import { useCharacteristicInt } from "../../bluetooth/useCharacteristic";
import BluetoothUuids from "../../bluetooth/uuids";
import { useDataContext } from "../../DataContext";
import { NextViewButton } from "../../components/NextViewButton";

export default function ParalelaView() {
  const ble = useBluetoothConnection();

  const [weightL] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicWeightL);
  const [weightR] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicWeightR);

  const [collectedWeight, setCollectedWeight] = useDataContext().parallelCollectedWeight;

  const weightLRef = useRef<number>();
  const weightRRef = useRef<number>();

  weightLRef.current = weightL;
  weightRRef.current = weightR;

  const countdown = useCountdown(async () => {
    // Dado coletado!
    hapticFeedbackProcessEnd();

    setCollectedWeight(((weightLRef.current ?? 0) + (weightRRef.current ?? 0)) / 2);
  }, 1000);

  const startCountdown = () => {
    countdown.setCount(5);
  };

  const shownWeight = countdown.isCounting ? (weightL + weightR) / 2 : collectedWeight;

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.compose(styles.barRow, { marginTop: 144 })}>
        <StatusDisplay
          style={StyleSheet.compose(styles.collectedData, styles.bar)}
          textLeft="L"
          textMain={weightL.toFixed(0)}
          textRight="kg"
        />
        <StatusDisplay
          style={StyleSheet.compose(styles.collectedData, styles.bar)}
          textLeft="R"
          textMain={weightR.toFixed(0)}
          textRight="kg"
        />
      </View>
      <View style={StyleSheet.compose(styles.barRow, { marginBottom: 32 })}>
        <StatusDisplay
          style={StyleSheet.compose(styles.collectedData, styles.bar)}
          textLeft="coleta"
          textMain={shownWeight.toFixed(2)}
          textRight="kg"
        />
      </View>
      <Button
        style={styles.actionButton}
        contentStyle={styles.actionButtonInner}
        mode="elevated"
        icon={() => countdown.isCounting && <MaterialCommunityIcons name="timer-sand" size={24} />}
        onPress={startCountdown}
        disabled={countdown.isCounting}
      >
        {countdown.isCounting ? `${countdown.count}s` : `Iniciar`}
      </Button>
      <NextViewButton
        icon="seat-legroom-extra"
        label={'Ir para "Malha aberta"'}
        target="Malha Aberta"
        visible={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    gap: 4
  },
  bar: {
    flexGrow: 1
  },
  actionButton: {
    marginTop: 0,
    margin: 16,
    backgroundColor: "#f0f0f0"
  },
  actionButtonInner: {
    paddingVertical: 12,
    backgroundColor: "#f0f0f0"
  },
  collectedData: {
    marginVertical: 2
  }
});
