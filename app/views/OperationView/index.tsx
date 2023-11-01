import { Animated, StyleSheet, View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusDisplay } from "../../components/StatusDisplay";
import { useDataContext } from "../../DataContext";
import { WeightIndicationBar } from "./WeightIndicatorBar";
import { useNumber } from "../../hooks/useNumber";
import { useEffect } from "react";

const useRandom = ({ min, max }: { min: number, max: number }) => {
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
  const [currentMese, setCurrentMese] = useDataContext().meseValue;

  const [setpoint, setSetpoint] = useNumber(50, { min: 0, max: currentMese });

  const rand1 = useRandom({ min: 0, max: currentMese });
  const rand2 = useRandom({ min: 0, max: currentMese });

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Operação
      </Text>
      <View style={styles.weightBarsWrapper}>
        <WeightIndicationBar
          textTop="ESQ"
          maximumValue={currentMese}
          value={rand1}
          setpointValue={setpoint}
          fillColor="#2E7D32"
          setpointColor="#C8E6C9"
        />
        <View style={styles.weightSetpointButtonsWrapper}>
          <FAB
            animated={false}
            mode="elevated"
            icon={() => <MaterialCommunityIcons name="plus" size={24} />}
            onPress={() => setSetpoint(setpoint + Math.floor(currentMese * 0.05))}
          ></FAB>
          <FAB
            animated={false}
            mode="elevated"
            icon={() => <MaterialCommunityIcons name="minus" size={24} />}
            onPress={() => setSetpoint(setpoint - Math.floor(currentMese * 0.05))}
          ></FAB>
        </View>
        <WeightIndicationBar
          textTop="DIR"
          maximumValue={currentMese}
          value={rand2}
          setpointValue={setpoint}
          fillColor="#9E9D24"
          setpointColor="#F0F4C3"
        />
      </View>
      <View style={styles.statusDisplays}>
        <StatusDisplay textLeft="MESE" textMain={currentMese.toString()} />
        <StatusDisplay textLeft="PWM" textMain={"0"} textRight="µS" />
      </View>
      <View style={styles.valueButtonsContainer}>
        <FAB
          animated={false}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="minus" size={24} />}
        ></FAB>
        <FAB
          animated={false}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="plus" size={24} />}
        ></FAB>
      </View>
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
  weightBarsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 32
  },
  weightSetpointButtonsWrapper: {
    flexDirection: "column",
    gap: 16
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
  }
});
