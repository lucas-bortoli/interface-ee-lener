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

export default function ParalelaView() {
  const ble = useBluetoothConnection();
  const [weightL] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicWeightL);
  const [collectedWeight, setCollectedWeight] = useDataContext().parallelCollectedWeight;
  const weightRef = useRef<number>();

  weightRef.current = weightL;

  const countdown = useCountdown(async () => {
    // Dado coletado!
    hapticFeedbackProcessEnd();

    setCollectedWeight(weightRef.current!);
  }, 1000);

  const startCountdown = () => {
    countdown.setCount(5);
  };

  const shownWeight = countdown.isCounting ? weightL : collectedWeight;

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Paralela
      </Text>
      <StatusDisplay
        style={styles.collectedData}
        textMain={shownWeight.toString()}
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
