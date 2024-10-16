import { registerRootComponent } from "expo";
import { Text } from "react-native";
import Login from "./(auth)/Login";
import Home from "./(tabs)/Home";
import EditNoteProperties from "./EditNoteProperties";
import Profile from "./Profile";

function Index() {
  return <Profile />;
}

export default registerRootComponent(Index);
