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
import { useCallback, useContext, useEffect, useState } from "react";
import { editNote } from "@/services/notes";
import {
  editJSONData,
  fetchData,
  getJSONData,
  removeData,
  storeJSONData,
} from "@/services/localstorage";
import { Note, NoteRequest } from "@/types/apiResponses";

const NoteScreen = () => {
  const theme = useTheme();

  const data = useLocalSearchParams();

  const title = data.title.toString();
  const content = data.content.toString();
  const priority = Number(data.priority);
  const _id = data._id.toString();
  const favorite = data.favorite === "true" ? true : false;
  const categories = [...data.categories];

  const [favoriteBool, setFavoriteBool] = useState<boolean>(favorite);

  useFocusEffect(
    useCallback(() => {
      saveLocalNote();
      console.log("content  id",content);
    }, [])
  );

  useEffect(() => {
    saveFavorite();
    return () => {
    };
  }, [favoriteBool]);

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

  const changeFavorite = async () => {
    try {
      setFavoriteBool(!favoriteBool);
    } catch (error) {
      console.log("Error al cambiar el estado de favorito", error);
    }
  } 

  const saveFavorite = async () => {
    try {
      const username = await fetchData("username");
      const {_id} = await getJSONData(
        "active-note"
      );

      const dataToSave: NoteRequest = {
        _id,
        favorite: favoriteBool,
      };

      await editJSONData("active-note", dataToSave);

      await editNote(username, dataToSave);
      console.log("saveFavorite method Finished?",favoriteBool);
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
                    await changeFavorite();

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
