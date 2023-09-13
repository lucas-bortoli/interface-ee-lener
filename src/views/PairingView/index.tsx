import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, FAB, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function PairingView() {
  const startPair = () => {};

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.Content title="Interface EE LENeR" />
      </Appbar.Header>
      <FAB icon={() => <MaterialCommunityIcons name="plus" size={24} />} style={styles.fab} />
      <ScrollView>
        <Text variant="headlineLarge" style={styles.heading}>
          Configuração
        </Text>
        <Text style={styles.text}>
          Conecte ao dispositivo via Bluetooth.
        </Text>
        <Text style={styles.text}>
          Aguardando conexão...
        </Text>
        <Button
          style={styles.pairButton}
          contentStyle={styles.pairButtonInner}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="bluetooth" size={24} />}
          onPress={startPair}
        >
          Parear com o hardware
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    margin: 32,
  },
  text: {
    marginHorizontal: 32,
    marginVertical: 8
  },
  pairButton: {
    marginTop: 48,
    margin: 32
  },
  pairButtonInner: {
    paddingVertical: 12
  },
  fab: {
    position: "absolute",
    margin: 32,
    right: 0,
    bottom: 0
  }
});
