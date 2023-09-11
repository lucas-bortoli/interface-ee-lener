import { registerRootComponent } from "expo";
import {
  PaperProvider
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ParalelaView } from "./views/Paralela";
import { MalhaAbertaView } from "./views/MalhaAbertaView";
import { PairingView } from "./views/PairingView";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MalhaAbertaView />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
