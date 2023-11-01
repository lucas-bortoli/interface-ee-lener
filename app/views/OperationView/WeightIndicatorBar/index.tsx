import { View, StyleSheet, ViewStyle, StyleProp, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { run } from "../../../utils/run";

interface Props {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  textTop?: string;
  maximumValue: number;
  value: number;
  setpointValue?: number;
  setpointColor?: string;
  fillColor?: string;
}

export function WeightIndicationBar(props: Props) {
  const fillHeight = Math.round((props.value / props.maximumValue) * 100);

  return (
    <View style={StyleSheet.compose(styles.box, props.style)}>
      <View
        style={StyleSheet.compose(styles.boxFill, {
          height: `${fillHeight}%`,
          backgroundColor: props.fillColor
        })}
      />
      {run(() => {
        if (!props.setpointValue) return;

        const setpointHeight = Math.round((props.setpointValue / props.maximumValue) * 100);

        return (
          <View
            style={StyleSheet.compose(styles.setpointBar, {
              bottom: `${setpointHeight}%`,
              backgroundColor: props.setpointColor
            })}
          />
        );
      })}
      <Text style={styles.labelTop}>{props.textTop}</Text>
      <Text style={styles.labelMain}>{props.value}</Text>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#323232",
    elevation: 6,
    position: "relative",
    height: 256,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden"
  },
  boxFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 0,
    backgroundColor: "darkred"
  },
  setpointBar: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: 4,
    backgroundColor: "red"
  },
  labelTop: {
    position: "absolute",
    fontFamily: "monospace",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    top: 16
  },
  labelMain: {
    position: "absolute",
    fontFamily: "monospace",
    fontSize: 24,
    color: "white",
    flexGrow: 1,
    textAlign: "center"
  }
});
