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
import { Note } from "@/types/apiResponses";

const NoteScreen = () => {
  const theme = useTheme();

  const data = useLocalSearchParams();

  const title = data.title.toString();
  const content = data.content.toString();
  const priority = Number(data.priority);
  const _id = data._id.toString();
  const favorite = data.favorite === "true" ? true : false;
  const categories = [...data.categories];

  const [favoriteBool, setFavorite] = useState<boolean>(favorite);

  useFocusEffect(
    useCallback(() => {
      saveLocalNote();
      console.log("content  id",content);
    }, [])
  );

  const saveLocalNote = async () => {
    try {
      console.log("saveLocalNote method");
      await removeData("active-note");

      const data: Note = {
        content,
        title,
        categories,
        favorite,
        priority,
        _id,
      };
      await storeJSONData("active-note", data);
      const a = await getJSONData("active-note");
      console.log("localStorage: ", a);
    } catch (error) {
      console.log("Error al guardar la nota localmente", error);
    }
  };

  const saveFavorite = async () => {
    try {
      console.log("saveFavorite method");
      const username = await fetchData("username");
      const { title, _id, categories, priority, content } = await getJSONData(
        "active-note"
      );
      const dataToSave: Note = {
        title,
        _id,
        favorite: !favoriteBool,
        categories,
        content,
        priority,
      };

      setFavorite(!favoriteBool);

      await editJSONData("active-note", dataToSave);

      // await removeData("active-note");
      //console.log("dataToSave", JSON.stringify(dataToSave, null, 2));
      const updatedData = await getJSONData("active-note");

      editNote(username, dataToSave);
      console.log("saveFavorite method Finished");
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
            backgroundColor: theme.colors.primaryContainer,
          },
          headerRight: () => {
            return (
              <View style={styles.headersLeft}>
                <Pressable
                  onPress={async () => {
                    await saveFavorite();
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
        <NoteHtml content={content} />
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
