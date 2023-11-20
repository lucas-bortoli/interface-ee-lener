import { PropsWithChildren } from "react";
import { Text, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props extends PropsWithChildren {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  textLeft?: string;
  textMain?: string;
  textRight?: string;
}

export function StatusDisplay(props: Props) {
  return (
    <View style={StyleSheet.compose(styles.box, props.style)}>
      <Text style={styles.labelLeft}>{props.textLeft}</Text>
      <Text style={styles.label}>{props.textMain}</Text>
      <Text style={styles.labelRight}>{props.textRight}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    backgroundColor: "#323232",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    borderRadius: 8
  },
  labelLeft: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "white",
    textAlign: "left"
  },
  label: {
    fontFamily: "monospace",
    fontSize: 24,
    color: "white",
    flexGrow: 1,
    textAlign: "center",
    position: "absolute",
    left: 0,
    right: 0
  },
  labelRight: {
    fontFamily: "monospace",
    fontSize: 16,
    color: "white",
    textAlign: "right"
  }
});
