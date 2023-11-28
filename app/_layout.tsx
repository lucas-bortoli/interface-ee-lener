import { Stack, useRouter } from "expo-router";
import { Appbar, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BluetoothProvider } from "./bluetooth/Context";
import { DataProvider } from "./DataContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hapticFeedbackControl } from "./haptics/HapticFeedback";
import theme from "./theme";

export default function App() {
  return (
    <BluetoothProvider>
      <DataProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <Stack
              initialRouteName="bluetooth"
              screenOptions={{
                freezeOnBlur: true,
                animation: "slide_from_right",
                header: (props) => {
                  const router = useRouter();

                  function onBack() {
                    hapticFeedbackControl();

                    if (router.canGoBack()) router.back();
                  }

                  return (
                    <Appbar.Header elevated>
                      {(props.route.params ?? ({} as any)).backButton === "true" && (
                        <Appbar.Action
                          icon={({ color, size }) => (
                            <MaterialCommunityIcons name="arrow-left" size={size} color={color} />
                          )}
                          onPress={onBack}
                        />
                      )}
                      {/*@ts-expect-error*/}
                      <Appbar.Content title={props.route.params?.title ?? "Interface EE LENeR"} />
                    </Appbar.Header>
                  );
                }
              }}
            ></Stack>
          </PaperProvider>
        </SafeAreaProvider>
      </DataProvider>
    </BluetoothProvider>
  );
}
