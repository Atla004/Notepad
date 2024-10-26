
import { notify } from "@alexsandersarmento/react-native-event-emitter";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";








export default function Layout() {

  notify("Layout");
  return (
  
      <Stack screenOptions={{ headerShown: false }} />
    
  );
}
