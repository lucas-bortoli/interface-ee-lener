import { registerRootComponent } from "expo";
import { Slot, Tabs } from "expo-router";
import { ScrollView } from "react-native";
import { Appbar, PaperProvider, useTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import theme from "./theme";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <Appbar.Header elevated>
          <Appbar.Content title="Interface EE LENeR" />
        </Appbar.Header>
        <ScrollView style={{backgroundColor: theme.colors.background }}>
          <Slot />
        </ScrollView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
