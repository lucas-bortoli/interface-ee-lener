import { registerRootComponent } from "expo";
import { Slot, Tabs } from "expo-router";
import { ScrollView } from "react-native";
import { Appbar, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header elevated>
          <Appbar.Content title="Interface EE LENeR" />
        </Appbar.Header>
        <ScrollView>
          <Slot />
        </ScrollView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
