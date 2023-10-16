import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, FAB, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusDisplay } from "../../components/StatusDisplay";
import { useBoolean } from "../../hooks/useBoolean";
import { run } from "../../utils/run";
import {
  hapticFeedbackControl,
  hapticFeedbackProcessEnd,
  hapticFeedbackProcessStart
} from "../../haptics/HapticFeedback";
import { useState } from "react";
import { timeout } from "../../utils/timeout";

export default function MalhaAbertaView() {
  const isOperating = useBoolean();

  const [currentPwm, setCurrentPwm] = useState(0);
  const [currentMese, setCurrentMese] = useState(0);
  const isWindingDown = useBoolean();

  const handleStartOperation = () => {
    if (isOperating.value === true) {
      return;
    }

    hapticFeedbackProcessStart();

    isOperating.setTrue();
    isWindingDown.setFalse();
  };

  const handleRegisterPwmValue = async () => {
    if (isOperating.value === false) {
      // Nada a parar
      return;
    }

    hapticFeedbackProcessEnd();
    setCurrentMese(currentPwm);
    isOperating.setFalse();
    isWindingDown.setTrue();

    let _pwm = currentPwm;
    while (_pwm > 0) {
      _pwm -= 5;
      setCurrentPwm(_pwm);
      hapticFeedbackControl();
      await timeout(500);
    }

    isWindingDown.setFalse();
  };

  const changeMese = (sign: "+" | "-") => {
    if (isOperating.value === false) {
      return;
    }

    const newPwm = currentPwm + (sign === "+" ? 5 : -5);
    const clamped = Math.max(Math.min(newPwm, 100), 0);

    setCurrentPwm(clamped);
    hapticFeedbackControl();
  };

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Malha aberta
      </Text>
      <View style={styles.statusDisplays}>
        <StatusDisplay textLeft="MESE" textMain={currentMese.toString()} />
        <StatusDisplay textLeft="PWM" textMain={currentPwm.toString()} textRight="µS" />
      </View>
      <View style={styles.valueButtonsContainer}>
        <Text style={styles.valueButtonsLabel}>PWM</Text>
        <FAB
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="minus" size={24} />}
          onPress={() => changeMese("-")}
          label="5"
          disabled={isOperating.value === false}
        ></FAB>
        <FAB
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="plus" size={24} />}
          onPress={() => changeMese("+")}
          label="5"
          disabled={isOperating.value === false}
        ></FAB>
      </View>
      {run(() => {
        if (isOperating.value === true || isWindingDown.value === true) {
          return (
            <Button
              style={styles.pairButton}
              mode="elevated"
              onPress={handleRegisterPwmValue}
              disabled={isWindingDown.value === true}
              icon={() => <MaterialCommunityIcons name="content-save" size={24} />}
            >
              Registrar valor PWM
            </Button>
          );
        }

        return (
          <Button style={styles.pairButton} mode="elevated" onPress={handleStartOperation}>
            Iniciar
          </Button>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "left",
    margin: 32
  },
  text: {
    marginHorizontal: 32,
    marginVertical: 8
  },
  pairButton: {
    margin: 32,
    height: 72,
    justifyContent: "center"
  },
  statusDisplays: {
    marginHorizontal: 32,
    marginVertical: 16,
    gap: 8
  },
  valueButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    margin: 32,
    position: "relative"
  },
  valueButtonsLabel: {
    position: "absolute",
    left: 0
  }
});
