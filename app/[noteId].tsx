import { Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
import {NoteHtml} from "@/components/NoteHtml";
import { FavoritesIcon,MoreIcon,SunIcon } from "@/components/Icon";


const NoteScreen = () => {
  const {noteId, description}=useLocalSearchParams();


  return (

    <View style= {styles.container}>
      <Stack.Screen
      options={{
        title: `${noteId}`,
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
                <SunIcon/>
              </Pressable>
              <Pressable
                onPress={() => console.log('Bookmark')}
              >
                <MoreIcon/>
              </Pressable>
            </>
          );
        }

      }}
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

