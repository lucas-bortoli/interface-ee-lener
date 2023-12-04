import { ScrollView, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusDisplay } from "../../components/StatusDisplay";
import { WeightIndicationBar } from "./WeightIndicatorBar";
import { useRef } from "react";
import { useCharacteristicInt } from "../../bluetooth/useCharacteristic";
import { useBluetoothConnection } from "../../bluetooth/Context";
import BluetoothUuids from "../../bluetooth/uuids";
import { ControlCodes, useControlCharacteristic } from "../../bluetooth/useControlCharacteristic";
import { hapticFeedbackControl, hapticFeedbackControlLight } from "../../haptics/HapticFeedback";

export default function OperationView() {
  const bt = useBluetoothConnection();

  const [parallelWeight] = useCharacteristicInt(
    bt.device!,
    BluetoothUuids.characteristicAverageCollectedWeight
  );
  const [weightL] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicWeightL);
  const [weightR] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicWeightR);
  const [pwm] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicPwm);
  const [mese] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicMese);
  const [meseMax] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicMeseMax);
  const [setpoint] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicSetpoint);

  const sendControl = useControlCharacteristic(bt.device!);

  function updateMaxMese(operation: "+" | "-") {
    hapticFeedbackControl();
    sendControl(
      operation === "+" ? ControlCodes.IncreaseMeseMaxStep : ControlCodes.DecreaseMeseMaxStep
    );
  }

  const _setpointRef = useRef(setpoint);
  _setpointRef.current = setpoint;
  function onSetpointChange(newSetpoint: number) {
    newSetpoint = Math.round(newSetpoint);
    if (_setpointRef.current === newSetpoint) return;
    sendControl(ControlCodes.SetSetpoint, newSetpoint);
    hapticFeedbackControlLight();
  }

  return (
    <ScrollView>
      <View style={StyleSheet.compose(styles.group, styles.weightBarsWrapper)}>
        <WeightIndicationBar
          textTop="ESQ"
          maximumValue={parallelWeight}
          value={weightL}
          setpointValue={setpoint}
          onSetpointChange={onSetpointChange}
          fillColor="#2E7D32"
          setpointColor="#C8E6C9"
          style={styles.weightBar}
        />
        <WeightIndicationBar
          textTop="DIR"
          maximumValue={parallelWeight}
          value={weightR}
          setpointValue={setpoint}
          onSetpointChange={onSetpointChange}
          fillColor="#9E9D24"
          setpointColor="#F0F4C3"
          style={styles.weightBar}
        />
      </View>
      <View style={StyleSheet.compose(styles.group, styles.displaysGroup)}>
        <StatusDisplay textLeft="PWM" textMain={pwm.toString()} textRight="µS" />
        <StatusDisplay
          textLeft="MESE"
          textMain={mese.toString()}
          textRight="atual"
          style={styles.display}
        />
      </View>
      <View style={Object.assign({}, styles.group, styles.displaysGroup, styles.lastGroup)}>
        <View style={styles.statusDisplayWrapper}>
          <StatusDisplay
            textLeft="MESE"
            textMain={meseMax.toString()}
            textRight="max"
            style={styles.display}
          />
          <View style={styles.statusDisplayButtons}>
            <FAB
              animated={false}
              size="small"
              icon={() => <MaterialCommunityIcons name="minus" size={24} />}
              onPress={() => updateMaxMese("-")}
            ></FAB>
            <FAB
              animated={false}
              size="small"
              icon={() => <MaterialCommunityIcons name="plus" size={24} />}
              onPress={() => updateMaxMese("+")}
            ></FAB>
          </View>
        </View>
        <View style={styles.statusDisplayWrapper}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 2,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  displaysGroup: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 2
  },
  statusDisplayWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  display: {
    flexGrow: 1
  },
  statusDisplayButtons: {
    flexDirection: "row",
    gap: 2
  },
  lastGroup: {
    /* for scrolling */
    marginBottom: 16
  },
  weightBar: {
    flexGrow: 1
  },
  weightBarsWrapper: {
    marginTop: 16,
    gap: 2
  }
});
