import { StyleSheet, View } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBluetoothConnection } from "../../bluetooth/Context";
import {
  hapticFeedbackProcessError,
  hapticFeedbackProcessStart
} from "../../haptics/HapticFeedback";
import { run } from "../../utils/run";
import { useState } from "react";

export default function PairingView() {
  const [isConnecting, setConnecting] = useState(false);
  const ble = useBluetoothConnection();
  const startPair = async () => {
    if (ble.status !== "DISCONNECTED") {
      return;
    }

    setConnecting(true);

    const success = await ble.connect();

    if (success) {
      hapticFeedbackProcessStart();
    } else {
      hapticFeedbackProcessError();
    }

    setConnecting(false);
  };

  const disconnect = async () => {
    if (ble.status !== "CONNECTED") {
      return;
    }

    await ble.disconnect();
  };

  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Conexão Bluetooth
      </Text>
      <Text style={styles.text}>Conecte ao dispositivo via Bluetooth.</Text>
      {isConnecting && (
        <View style={styles.statusIndicatorContainer}>
          <ActivityIndicator size="small" />
          <Text style={styles.statusIndicator}>Procurando dispositivo...</Text>
        </View>
      )}
      <View style={styles.buttons}>
        <Button
          contentStyle={styles.pairButtonInner}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="bluetooth" size={24} />}
          onPress={startPair}
          disabled={isConnecting || ble.status === "CONNECTED"}
        >
          Conectar ao hardware
        </Button>
        <Button
          contentStyle={styles.pairButtonInner}
          mode="elevated"
          onPress={disconnect}
          disabled={isConnecting || ble.status === "DISCONNECTED"}
        >
          Desconectar
        </Button>
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
  buttons: {
    marginVertical: 8,
    marginHorizontal: 32,
    gap: 8
  },
  pairButtonInner: {
    paddingVertical: 12,
    backgroundColor: "#f0f0f0"
  },
  statusIndicator: {
    marginLeft: 16
  },
  statusIndicatorContainer: {
    marginHorizontal: 32,
    flexDirection: "row",
    alignItems: "center"
  }
});
