import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, FAB, Text, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function PairingView() {
  const startPair = () => {};

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.Content title="Interface EE LENeR" />
      </Appbar.Header>
      <ScrollView>
        <Text variant="headlineLarge" style={styles.heading}>
          Conexão Bluetooth
        </Text>
        <Text style={styles.text}>Conecte ao dispositivo via Bluetooth.</Text>
        <View style={styles.statusIndicatorContainer}>
          <ActivityIndicator size="small" />
          <Text style={styles.statusIndicator}>Aguardando conexão...</Text>
        </View>
        <Button
          style={styles.pairButton}
          contentStyle={styles.pairButtonInner}
          mode="elevated"
          icon={() => <MaterialCommunityIcons name="bluetooth" size={24} />}
          onPress={startPair}
        >
          Conectar ao hardware
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    margin: 32
  },
  text: {
    marginHorizontal: 32,
    marginVertical: 8
  },
  pairButton: {
    margin: 32,
    marginTop: 16
  },
  pairButtonInner: {
    paddingVertical: 12
  },
  statusIndicator: {
    marginLeft: 16
  },
  statusIndicatorContainer: {
    marginTop: "30%",
    marginHorizontal: 32,
    flexDirection: "row",
    alignItems: "center"
  }
});
