import { registerRootComponent } from "expo";
import { BluetoothProvider } from "./bluetooth/Context";
import { DataProvider } from "./DataContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import theme from "./theme";

import { Router } from "./Routing";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const navigator = useNavigationContainerRef();

  return (
    <SafeAreaProvider>
      <BluetoothProvider>
        <DataProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer ref={navigator}>
              <PaperProvider theme={theme}>
                <Router />
              </PaperProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </DataProvider>
      </BluetoothProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
