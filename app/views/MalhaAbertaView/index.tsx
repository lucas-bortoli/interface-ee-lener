import { StyleSheet, View } from "react-native";
import { Button, FAB } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusDisplay } from "../../components/StatusDisplay";
import { useBoolean } from "../../hooks/useBoolean";
import { run } from "../../utils/run";
import {
  hapticFeedbackControl,
  hapticFeedbackProcessEnd,
  hapticFeedbackProcessStart
} from "../../haptics/HapticFeedback";
import { useEffect } from "react";
import { useBluetoothConnection } from "../../bluetooth/Context";
import { useCharacteristicInt } from "../../bluetooth/useCharacteristic";
import BluetoothUuids from "../../bluetooth/uuids";
import { ControlCodes, useControlCharacteristic } from "../../bluetooth/useControlCharacteristic";
import { NextViewButton } from "../../components/NextViewButton";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";

export default function MalhaAbertaView() {
  const ble = useBluetoothConnection();

  const isOperating = useBoolean();
  const isWindingDown = useBoolean();

  const [currentMese] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicMese);
  const [btPwm] = useCharacteristicInt(ble.device, BluetoothUuids.characteristicPwm);
  const sendControl = useControlCharacteristic(ble.device!);

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
    isOperating.setFalse();
    isWindingDown.setTrue();

    await sendControl(ControlCodes.SaveMese);
    await sendControl(ControlCodes.ResetPwmGradual);
  };

  const changeMese = async (sign: "+" | "-") => {
    if (isOperating.value === false) {
      return;
    }

    sendControl(sign === "+" ? ControlCodes.IncreasePwmStep : ControlCodes.DecreasePwmStep);
  };

  useEffect(() => {
    if (isWindingDown && btPwm === 0) {
      isWindingDown.setFalse();
    }
  }, [isWindingDown, btPwm]);

  useUpdateEffect(() => {
    hapticFeedbackControl();
  }, [btPwm]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.statusDisplays}>
        <StatusDisplay textLeft="MESE" textMain={currentMese.toString()} />
        <StatusDisplay textLeft="PWM" textMain={btPwm.toString()} textRight="µS" />
      </View>
      <View style={styles.valueButtonsContainer}>
        <FAB
          animated={false}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="minus" size={24} />}
          onPress={() => changeMese("-")}
          disabled={isOperating.value === false}
        ></FAB>
        <FAB
          animated={false}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="plus" size={24} />}
          onPress={() => changeMese("+")}
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
      <NextViewButton
        icon="seat-legroom-extra"
        label={'Ir para "Operação"'}
        target="Operação"
        visible={isWindingDown.value === false && isOperating.value === false && currentMese > 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 64,
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
  }
});
