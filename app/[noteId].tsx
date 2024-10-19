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
import { useCallback, useContext, useState } from "react";
import { editNote } from "@/services/notes";
import {
  editJSONData,
  fetchData,
  getJSONData,
  removeData,
  storeJSONData,
} from "@/services/localstorage";
import { NoteContext } from "./NoteContext";

const NoteScreen = () => {
  const {
    noteId: title,
    description,
    priority,
    _id,
    favorite,
    categories,
  } = useLocalSearchParams();

  const theme = useTheme();
  const [textContent, setTextContent] = useState("");

  const { noteData, setNoteData } = useContext(NoteContext);
  const [favoriteBool, setFavorite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setFavorite(noteData.favorite);
      saveLocalNote();
    }, [])
  );

  const getFavorite = async () => {
    return favoriteBool;
  };

  const saveLocalNote = async () => {
    await removeData("active-note");
    const data = {
      content: noteData.description,
      title: noteData.title,
      categories: noteData.categories,
      favorite: noteData.favorite,
      priority: noteData.priority,
      _id: noteData._id,
    };
    await storeJSONData("active-note", data);
    const a = await getJSONData("active-note");
    console.log("localStorage: ", a);
  };

  const guardarNota = async () => {
    try {
      const username = await fetchData("username");
      const { title, _id, categories, priority, content } = await getJSONData(
        "active-note"
      );
      const dataToSave = {
        title,
        _id: _id ?? "",
        favorite: !favoriteBool,
        categories: categories ?? [],
        content: (content as string) ?? "",
        priority,
      };

      setFavorite(!favoriteBool);

      await editJSONData("active-note", dataToSave);

      // await removeData("active-note");
      //console.log("dataToSave", JSON.stringify(dataToSave, null, 2));
      const updatedData = await getJSONData("active-note");

      editNote(username, dataToSave);
      console.log("Nota guardada noteId");
    } catch (error) {
      console.log("Error al guardar la nota", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Stack.Screen
        options={{
          title: `${title}`,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer, // Cambia este valor al color que desees
          },
          headerRight: () => {
            return (
              <View style={styles.headersLeft}>
                <Pressable
                  onPress={async () => {
                    await guardarNota();
                  }}
                >
                  {favoriteBool ? <FilledFavoritesIcon /> : <FavoritesIcon />}
                </Pressable>
                <Pressable
                  style={{ marginTop: 2 }}
                  onPress={() => {
                    router.push({ pathname: `./EditNoteProperties` });
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
        <NoteHtml />
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
