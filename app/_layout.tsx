import { registerRootComponent } from "expo";
import { Slot, Stack } from "expo-router";
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
            <Stack
              screenOptions={{
                animation: "slide_from_right",
                header: (props) => (
                  <Appbar.Header elevated>
                    {/*@ts-expect-error*/}
                    <Appbar.Content title={props.route.params?.title ?? "Interface EE LENeR"} />
                  </Appbar.Header>
                )
              }}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </DataProvider>
    </BluetoothProvider>
  );
}

registerRootComponent(App);
