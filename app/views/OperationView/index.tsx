import { Animated, StyleSheet, View } from "react-native";
import { Button, FAB, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusDisplay } from "../../components/StatusDisplay";
import { useDataContext } from "../../DataContext";
import { WeightIndicationBar } from "./WeightIndicatorBar";
import { useNumber } from "../../hooks/useNumber";
import { useEffect, useState } from "react";
import { hapticFeedbackControl } from "../../haptics/HapticFeedback";
import { useCharacteristicInt } from "../../bluetooth/useCharacteristic";
import { useBluetoothConnection } from "../../bluetooth/Context";
import BluetoothUuids from "../../bluetooth/uuids";

const useRandom = ({ min, max }: { min: number; max: number }) => {
  const [value, setValue] = useNumber(0, { min, max });

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * max));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return value;
};

export default function OperationView() {
  const data = useDataContext();

  const [parallelWeight] = data.parallelCollectedWeight;
  const [currentMese] = data.meseValue;

  const [setpoint, setSetpoint] = useState(currentMese / 2);
  const bt = useBluetoothConnection();

  const [weightL] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicWeightL);
  const [weightR] = useCharacteristicInt(bt.device!, BluetoothUuids.characteristicWeightR);

  console.log(setpoint)

  return (
    <>
      <View style={StyleSheet.compose(styles.group, styles.weightBarsWrapper)}>
        <WeightIndicationBar
          textTop="ESQ"
          maximumValue={parallelWeight}
          value={weightL}
          setpointValue={setpoint}
          onSetpointChange={setSetpoint}
          fillColor="#2E7D32"
          setpointColor="#C8E6C9"
          style={styles.weightBar}
        />
        <WeightIndicationBar
          textTop="DIR"
          maximumValue={parallelWeight}
          value={weightR}
          setpointValue={setpoint}
          onSetpointChange={setSetpoint}
          fillColor="#9E9D24"
          setpointColor="#F0F4C3"
          style={styles.weightBar}
        />
      </View>
      <View style={styles.group}>
        <View style={styles.statusDisplays}>
          <StatusDisplay textLeft="MESE" textMain={currentMese.toString()} />
        </View>
        <View style={styles.weightSetpointButtonsWrapper}>
          <FAB
            animated={false}
            size="small"
            icon={() => <MaterialCommunityIcons name="plus" size={24} />}
            onPress={() => setSetpoint(setpoint + Math.floor(currentMese * 0.05))}
          ></FAB>
          <FAB
            animated={false}
            size="small"
            icon={() => <MaterialCommunityIcons name="minus" size={24} />}
            onPress={() => setSetpoint(setpoint - Math.floor(currentMese * 0.05))}
          ></FAB>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    borderRadius: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  weightSetpointButtonsWrapper: {
    flexDirection: "column",
    gap: 8
  },
  weightBar: {
    flexGrow: 1
  },
  weightBarsWrapper: {
    gap: 2
  },
  statusDisplays: {
    gap: 8,
    flexGrow: 1
  }
});
