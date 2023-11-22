import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useCountdown } from "../../hooks/useCountdown";
import { useRef, useState } from "react";
import { StatusDisplay } from "../../components/StatusDisplay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hapticFeedbackProcessEnd } from "../../haptics/HapticFeedback";
import { useBluetoothConnection } from "../../bluetooth/Context";
import { useCharacteristicInt } from "../../bluetooth/useCharacteristic";
import BluetoothUuids from "../../bluetooth/uuids";
import { useDataContext } from "../../DataContext";
import { useHeaderTitle } from "../../hooks/useHeaderTitle";

export default function ParalelaView() {
  const ble = useBluetoothConnection();

  const [weightL] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicWeightL);
  const [weightR] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicWeightR);

  const [collectedWeight, setCollectedWeight] = useDataContext().parallelCollectedWeight;
  const weightRef = useRef<number>();

  console.log(weightL, weightR, (weightL + weightR) / 2);
  weightRef.current = (weightL + weightR) / 2;

  const countdown = useCountdown(async () => {
    // Dado coletado!
    hapticFeedbackProcessEnd();

    setCollectedWeight(weightRef.current!);
  }, 1000);

  const startCountdown = () => {
    countdown.setCount(5);
  };

  const shownWeight = countdown.isCounting ? weightRef.current : collectedWeight;

  useHeaderTitle("Paralela");

  return (
    <>
      <StatusDisplay
        style={styles.collectedData}
        textMain={shownWeight.toFixed(2)}
        textRight="kg"
      />
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
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    margin: 32,
    textAlign: "left"
  },
  actionButton: {
    marginTop: 48,
    margin: 32,
    backgroundColor: "#f0f0f0"
  },
  actionButtonInner: {
    paddingVertical: 12,
    backgroundColor: "#f0f0f0"
  },
  collectedData: {
    marginVertical: 16,
    marginHorizontal: 32
  }
});
