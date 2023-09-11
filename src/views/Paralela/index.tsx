import { ScrollView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCountdown } from "../../hooks/useCountdown";
import { useState } from "react";
import { timeoutSync } from "../../utils/timeout";
import { run } from "../../utils/run";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";

export function ParalelaView() {
  const [collectedData, setCollectedData] = useState<number | null>(null);

  const countdown = useCountdown(async () => {
    // Coleta de dado...
    timeoutSync(1000);

    // Dado coletado!
    impactAsync(ImpactFeedbackStyle.Medium);
    setCollectedData(Math.floor(Math.random() * 1024));
  }, 1000);

  const startCountdown = () => {
    countdown.setCount(5);
    setCollectedData(null);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text variant="headlineLarge" style={styles.heading}>
          Paralela
        </Text>
        <Button
          style={styles.actionButton}
          contentStyle={styles.actionButtonInner}
          mode="elevated"
          onPress={startCountdown}
          disabled={countdown.isCounting}
        >
          {countdown.isCounting ? `${countdown.count}s` : `Iniciar`}
        </Button>
        {run(() => {
          if (collectedData === null) {
            return null;
          }

          return (
            <Text variant="displayLarge" style={styles.collectedData}>
              {collectedData}
            </Text>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    margin: 32,
    marginTop: "50%",
    textAlign: "center"
  },
  actionButton: {
    marginTop: 48,
    margin: 32
  },
  actionButtonInner: {
    paddingVertical: 12
  },
  collectedData: {
    textAlign: "center"
  }
});
