import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { NoteHtml } from "@/components/NoteHtml";
import {
  FavoritesIcon,
  FilledFavoritesIcon,
  SettingsIcon,
} from "@/components/Icon";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLocalNote } from "@/services/notelocalstorage";
import {
  addListener,
  notify,
  removeListener,
} from "@alexsandersarmento/react-native-event-emitter";
import { fetchData } from "@/services/localstorage";

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
  const [loading, setLoading] = useState<boolean>(true);
  const shouldHandleBeforeRemove = useRef<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      notify("disable");
      removeListener("disable");
      getNoteData();
      return;
    }, [])
  );

  const navigation = useNavigation();

  useEffect(() => {
    const onBeforeRemove = (e: { preventDefault: () => void }) => {
      if (!shouldHandleBeforeRemove.current) return;
      e.preventDefault();

      console.log("onBeforeRemove");

      shouldHandleBeforeRemove.current = false;
      // router.back();
      fetchData('active-tab').then((tab) => {
        router.dismissAll();
        router.replace(`/${tab}`);
      })
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
      const localNoteData = await getLocalNote();
      console.log("LocalNoteData", localNoteData);

      setContent(localNoteData.content);
      setFavoriteBool(localNoteData.favorite);
      priority.current = localNoteData.priority;
    } catch (error) {
      console.log("(getNoteData)Error al obtener info de la nota", error);
    } finally {
      setLoading(false);
    }
  };

  const goToEditNoteProperties = () => {
    if (loading) return;
    removeListener("goToEditNoteProperties");
    setLoading(true);
    router.push({
      pathname: `/EditNoteProperties`,
      params: { _id, title, priority: priority.current },
    });
  };

  addListener("goToEditNoteProperties", goToEditNoteProperties);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

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
                    notify("goToEditNoteProperties");
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
        <NoteHtml content={content} _id={_id} favorite={favoriteBool} />
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
