import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Text, ActivityIndicator, withTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { hapticFeedbackControl } from "./haptics/HapticFeedback";

interface MenuButtonProps {
  icon: string;
  label: string;
  target: string;
}

function MenuButton(props: MenuButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    hapticFeedbackControl();
    router.push(props.target);
  };

  return (
    <Button
      style={styles.menuButton}
      contentStyle={styles.menuButtonInner}
      mode="elevated"
      icon={() => <MaterialCommunityIcons style={styles.menuButtonIcon} name={props.icon as any} size={24} />}
      onPress={handlePress}
    >
      {props.label}
    </Button>
  );
}

export default function Menu() {
  return (
    <>
      <Text variant="headlineLarge" style={styles.heading}>
        Menu
      </Text>
      <View style={styles.buttonList}>
        <MenuButton
          icon="bluetooth"
          label="Conectar ao hardware"
          target="/views/PairingView/"
        ></MenuButton>
        <MenuButton
          icon="drag-vertical-variant"
          label="Paralela"
          target="/views/Paralela/"
        ></MenuButton>
        <MenuButton
          icon="seat-legroom-extra"
          label="Malha aberta"
          target="/views/MalhaAbertaView/"
        ></MenuButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    margin: 32
  },
  buttonList: {
    marginVertical: 16,
    marginHorizontal: 32,
    gap: 8
  },
  menuButton: {
  },
  menuButtonInner: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 12
  },
  menuButtonIcon: {
    
  }
});
