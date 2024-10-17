import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { NoteHtml } from "@/components/NoteHtml";
import { FavoritesIcon, SettingsIcon } from "@/components/Icon";

const NoteScreen = () => {
  const { noteId, description } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${noteId}`,
          headerShown: true,
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
      <NoteHtml />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
