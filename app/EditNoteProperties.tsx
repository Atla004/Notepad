import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import {NoteHtml} from "@/components/NoteHtml";
import { FavoritesIcon,TrashIcon } from "@/components/Icon";
import { TextInput } from "react-native-paper";
import { useState } from "react";

import { Chip,Button } from 'react-native-paper';
import { PlusIcon } from "@/components/Icon";
import CategorySheet from "@/components/CategorySheet";




const EditNoteProperties = () => {
  const [noteName, setNoteName] = useState("");

  return (

    <View>
      <Stack.Screen
      options={{
        title: `Edit Note Properties`,
        headerShown: true,
        headerRight: () => {
          return (
            <>
              <Pressable
                onPress={() => console.log('Bookmark')}
              >
                <FavoritesIcon/>
              </Pressable>
              <Pressable
                onPress={() => console.log('Bookmark')}
              >
                <TrashIcon/>
              </Pressable>

            </>
          );
        }

      }}
      />

      <TextInput
        style={styles.input}
        label="name"
        value={noteName}
        mode="outlined"
        onChangeText={(text) => setNoteName(text)}      
      />
      <Chip icon="close" onPress={() => console.log('Pressed')}>Example Chip</Chip>
      <Chip icon="close" onPress={() => console.log('Pressed')}>Example Chip</Chip>



      <CategorySheet/>            

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    maxWidth: 200, // Set the maximum width to 300
    width: "100%", // Ensure the input takes up the full width of its container
  },
  card: {
    width: 250,
  },
  container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
  },
});

export default EditNoteProperties;