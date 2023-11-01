import { registerRootComponent } from "expo";
import { Slot } from "expo-router";
import { ScrollView } from "react-native";
import { Appbar, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "./theme";
import { BluetoothProvider } from "./bluetooth/Context";
import { DataProvider } from "./DataContext";

export default function App() {

  return (
    <BluetoothProvider>
      <DataProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <Appbar.Header elevated>
              <Appbar.Content title="Interface EE LENeR" />
            </Appbar.Header>
            <ScrollView style={{ backgroundColor: theme.colors.background }}>
              <Slot />
            </ScrollView>
          </PaperProvider>
        </SafeAreaProvider>
      </DataProvider>
    </BluetoothProvider>
  );
}

registerRootComponent(App);
