import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { NoteHtml } from "@/components/NoteHtml";
import { FavoritesIcon, SettingsIcon } from "@/components/Icon";
import { useTheme } from "react-native-paper";

const NoteScreen = () => {
  const { noteId, description } = useLocalSearchParams();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Stack.Screen
        options={{
          title: `${noteId}`,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer, // Cambia este valor al color que desees
          },
          headerRight: () => {
            return (
              <View style={styles.headersLeft}>
                <Pressable onPress={() => console.log("Bookmark")}>
                  <FavoritesIcon />
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
