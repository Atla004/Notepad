import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { NoteHtml } from "@/components/NoteHtml";
import {
  FavoritesIcon,
  FilledFavoritesIcon,
  SettingsIcon,
} from "@/components/Icon";
import { useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLocalNote } from "@/services/notelocalstorage";

const NoteScreen = () => {
  const data = useLocalSearchParams();
  const theme = useTheme();
  console.log("NoteScreen", data._id, data.title);
  const _id = data._id.toString();
  const title = data.title.toString();

  const [favoriteBool, setFavoriteBool] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const priority = useRef<number>(0);
  const listenerRef = useRef<((e: any) => void) | null>(null);


  useFocusEffect(
    useCallback(() => {
      getNoteData();
      return 
    }, [])
  );

  const navigation = useNavigation();

  useEffect(() => {
    const onBeforeRemove = (e: { preventDefault: () => void }) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Redirigir a la pantalla deseada
      router.push({
        pathname: `/Home`,
      });
    };

    // Eliminar el listener existente si hay uno
    if (listenerRef.current) {
      console.log("Removing existing beforeRemove listener");
      navigation.removeListener("beforeRemove", listenerRef.current);
    }

    // Añadir el nuevo listener y almacenarlo en la referencia
    navigation.addListener("beforeRemove", onBeforeRemove);
    listenerRef.current = onBeforeRemove;

    // Eliminar el listener cuando el componente se desmonta
    return () => {
      if (listenerRef.current) {
        navigation.removeListener("beforeRemove", listenerRef.current);
        listenerRef.current = null;
      }
    };
  }, [navigation]);


  const getNoteData = async () => {
    try {
      const localNoteData =await getLocalNote();
      console.log("LocalNoteData", localNoteData);
      

      setContent(localNoteData.content);
      setFavoriteBool(localNoteData.favorite);
      priority.current = localNoteData.priority;
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
