import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Text, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { hapticFeedbackControl } from "./haptics/HapticFeedback";

export default function Menu() {
  const router = useRouter();

  const goTo = (page: string) => {
    hapticFeedbackControl();
    router.push(page);
  };

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Menu
      </Text>
      <Button
        style={styles.menuButton}
        contentStyle={styles.menuButtonInner}
        mode="elevated"
        icon={() => <MaterialCommunityIcons name="bluetooth" size={24} />}
        onPress={() => goTo("/views/PairingView/")}
      >
        Conectar ao hardware
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    margin: 32
  },
  menuButton: {
    margin: 32,
    marginTop: 16
  },
  menuButtonInner: {
    paddingVertical: 12
  }
});
