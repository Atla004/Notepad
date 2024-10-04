import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import {NoteHtml} from "@/components/NoteHtml";


const NoteScreen = () => {
  const {noteId, description}=useLocalSearchParams();


  return (

    <View style= {styles.container}>
      <Stack.Screen
      options={{title: `${noteId}`}}
      />
      <NoteHtml/>


    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});


export default NoteScreen;

