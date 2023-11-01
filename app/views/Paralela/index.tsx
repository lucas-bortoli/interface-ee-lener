import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCountdown } from "../../hooks/useCountdown";
import { useState } from "react";
import { timeoutSync } from "../../utils/timeout";
import { StatusDisplay } from "../../components/StatusDisplay";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hapticFeedbackProcessEnd } from "../../haptics/HapticFeedback";
import { useBluetoothConnection } from "../../bluetooth/Context";
import { useCharacteristicInt } from "../../bluetooth/useCharacteristic";
import BluetoothUuids from "../../bluetooth/uuids";

export default function ParalelaView() {
  const ble = useBluetoothConnection();
  const [weightL] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicWeightL);

  const countdown = useCountdown(async () => {
    // Coleta de dado...
    timeoutSync(1000);

    // Dado coletado!
    hapticFeedbackProcessEnd();
  }, 1000);

  const startCountdown = () => {
    countdown.setCount(5);
  };

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Paralela
      </Text>
      <StatusDisplay
        style={styles.collectedData}
        textMain={weightL.toString() ?? "0"}
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
    paddingVertical: 12
  },
  collectedData: {
    marginVertical: 16,
    marginHorizontal: 32
  }
});
