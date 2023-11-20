import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Text } from "react-native-paper";
import { run } from "../../../utils/run";
import { useSlideGesture } from "./useSlideGesture";
import { useEffect } from "react";

interface Props {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  textTop?: string;
  maximumValue: number;
  value: number;
  setpointValue: number;
  onSetpointChange(newValue: number): void;
  setpointColor: string;
  fillColor: string;
}

export function WeightIndicationBar(props: Props) {
  const { sliderProps } = useSlideGesture({
    currentValue: props.setpointValue,
    maximumValue: props.maximumValue,
    onSlide: props.onSetpointChange
  });

  const fillHeight = Math.round((props.value / props.maximumValue) * 100);

  return (
    <View style={StyleSheet.compose(styles.box, props.style)} {...sliderProps}>
      <View
        style={StyleSheet.compose(styles.boxFill, {
          height: `${fillHeight}%`,
          backgroundColor: props.fillColor
        })}
        pointerEvents="none"
      />
      {run(() => {
        const setpointHeight = ((props.setpointValue / props.maximumValue) * 100);

        return (
          <View
            style={StyleSheet.compose(styles.setpointBar, {
              bottom: `${setpointHeight}%`,
              backgroundColor: props.setpointColor
            })}
            pointerEvents="none"
          >
            <Text
              style={StyleSheet.compose(styles.setpointText, {
                color: props.setpointColor
              })}
            >
              {(Math.round(props.setpointValue * 100) / 100).toFixed(2)}
            </Text>
          </View>
        );
      })}
      <Text style={styles.labelTop}>{props.textTop}</Text>
      <Text style={styles.labelMain}>{props.value} kg</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#323232",
    elevation: 2,
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
    width: "60%",
    height: 2,
    backgroundColor: "red"
  },
  setpointText: {
    position: "absolute",
    right: "-60%",
    top: -9,
    fontFamily: "monospace"
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
