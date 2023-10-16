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
import { run } from "../../utils/run";

export default function ParalelaView() {
  const [collectedData, setCollectedData] = useState<number | null>(null);
  const ble = useBluetoothConnection();

  const countdown = useCountdown(async () => {
    // Coleta de dado...
    timeoutSync(1000);

    // Dado coletado!
    hapticFeedbackProcessEnd();
    setCollectedData(Math.floor(Math.random() * 80) + 40);
  }, 1000);

  const startCountdown = () => {
    countdown.setCount(5);
    setCollectedData(null);
  };

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Paralela
      </Text>
      {run(() => {
        let weightValue: number;

        if (ble.status !== "CONNECTED") {
          weightValue = 0;
        } else {
          weightValue = ble.weightL;
        }

        return (
          <StatusDisplay
            style={styles.collectedData}
            textMain={weightValue.toString() ?? "0"}
            textRight="kg"
          />
        );
      })}
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
