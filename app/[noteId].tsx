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
import { fetchData } from "@/services/localstorage";
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

  // console.log("title", title);

  const { noteData, setNoteData } = useContext(NoteContext);

  const datas = {
    title: title ? title.toString() : "",
    description: description ? description.toString() : "",
    priority: Number(priority?.toString()),
    favorite: Boolean(favorite?.toString()),
    _id: _id?.toString(),
    categories: categories as string[],
  };

  const theme = useTheme();
  const navigation = useNavigation();
  const [favoriteBool, setFavorite] = useState(true);
  const [textContent, setTextContent] = useState("");

  const guardarNota = async () => {
    try {
      const {title, description, priority, _id, categories} = noteData;
      const username = await fetchData("username");
      editNote(username, {
        title: title.toString(),
        content: description? description.toString() : "Esta vacio...",
        priority: Number(priority),
        _id: _id? _id.toString() : "",
        favorite: favoriteBool,
        categories: categories ? categories : [],
      });
      console.log("Nota guardada");
    } catch (error) {
      console.log("Error al guardar la nota", error);
    }
  };

/*   useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        guardarNota();
        console.log("Nota guardadanoteid"); 
      });

      return unsubscribe;
    }, [navigation])
  );

  useFocusEffect(
    useCallback(() => {
      setFavorite(favorite === "true");
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      console.log("datas", datas);
      setNoteData(datas);
    }, [])
  ); */

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
                  onPress={() => {
                    setFavorite(!favoriteBool);
                  }}
                >
                  {favoriteBool ? <FilledFavoritesIcon /> : <FavoritesIcon />}
                </Pressable>
                <Pressable
                  style={{ marginTop: 2 }}
                  onPress={() =>
                    router.push({ pathname: `./EditNoteProperties` })
                  }
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
        <NoteHtml setContent={setTextContent} />
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
