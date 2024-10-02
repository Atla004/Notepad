import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

const NoteScreen = () => {
  const {noteId, description}=useLocalSearchParams();
  return (

    <View>
      <Stack.Screen
      options={{title: `${noteId}`}}
      />
    <Text style={{ textAlign: 'center', color: 'black', fontSize: 16 }}>{description}</Text>
    </View>
  );
};

export default NoteScreen;

