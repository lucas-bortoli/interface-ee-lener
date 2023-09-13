import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, FAB, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusDisplay } from "../../components/StatusDisplay";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { useBoolean } from "../../hooks/useBoolean";

export function MalhaAbertaView() {
  const operation = useBoolean();

  const startOperation = () => {
    operation.setTrue();
  }

  const stopOperation = () => {
    if (operation.value === false) {
      // Nada a parar
      return;
    }

    operation.setFalse();
  }

  const changeMese = () => {
    impactAsync(ImpactFeedbackStyle.Medium);
  }

  return (
    <>
      <Appbar.Header elevated>
        <Appbar.Content title="Interface EE LENeR" />
      </Appbar.Header>
      <ScrollView>
        <Text variant="headlineLarge" style={styles.heading}>
          Malha aberta
        </Text>
        <View style={styles.statusDisplays}>
          <StatusDisplay textLeft="MESE" textMain="0" />
          <StatusDisplay textLeft="PWM" textMain="0" textRight="µS" />
        </View>
        <View style={styles.valueButtonsContainer}>
          <FAB
            mode="elevated"
            icon={() => <MaterialCommunityIcons name="minus" size={24} />}
            onPress={changeMese}
            label="5"
          ></FAB>
          <FAB
            mode="elevated"
            icon={() => <MaterialCommunityIcons name="plus" size={24} />}
            onPress={changeMese}
            label="5"
          ></FAB>
        </View>
        <Button
          style={styles.pairButton}
          contentStyle={styles.pairButtonInner}
          mode="elevated"
          onPress={() => {}}
        >
          Iniciar
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
    margin: 32
  },
  pairButtonInner: {
    paddingVertical: 12
  },
  statusDisplays: {
    marginHorizontal: 32,
    marginVertical: 16,
    gap: 8
  },
  valueButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 32
  }
});
