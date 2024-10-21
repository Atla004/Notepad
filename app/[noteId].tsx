import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { NoteHtml } from "@/components/NoteHtml";
import {
  FavoritesIcon,
  FilledFavoritesIcon,
  SettingsIcon,
} from "@/components/Icon";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { editNote, getNote } from "@/services/notes";
import {
  editJSONData,
  fetchData,
  getJSONData,
  removeData,
  storeJSONData,
} from "@/services/localstorage";
import { Note, NoteRequest } from "@/types/apiResponses";

const NoteScreen = () => {
  const data = useLocalSearchParams();
  console.log("NoteScreen");
  const theme = useTheme();
  const _id = data._id.toString();
  const title = data.title.toString();

  const [favoriteBool, setFavoriteBool] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const priority = useRef<number>(0);


  useFocusEffect(
    useCallback(() => {
      getNoteData();
      return 
    }, [])
  );

  const getNoteData = async () => {
    try {
      const username = await fetchData('username');
      const noteData = await getNote(username,_id);
      setContent(noteData.content);
      setFavoriteBool(noteData.favorite);
      priority.current = noteData.priority;
    } catch (error) {
      console.log("(getNoteData)Error al obtener info de la nota", error);
    }
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Stack.Screen
        options={{
          title: `${title}`,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
          headerRight: () => {
            return (
              <View style={styles.headersLeft}>
                <Pressable
                  onPress={() => {
                    setFavoriteBool(!favoriteBool);
                  }}
                >
                  {favoriteBool ? <FilledFavoritesIcon /> : <FavoritesIcon />}
                </Pressable>
                <Pressable
                  style={{ marginTop: 2 }}
                  onPress={() => {
                    router.push({ pathname: `./EditNoteProperties`,params:{_id, title, priority: priority.current}});
                  }}
                >
                  <SettingsIcon />
                </Pressable>
              </View>
            );
          },
        }}
      />
      <StatusBar />

      <View style={[styles.noteContainer]}>
        <NoteHtml content={content} _id={_id}  favorite ={favoriteBool}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headersLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: 80,
  },
});

export default NoteScreen;
