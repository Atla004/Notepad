import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, FlatList, Pressable, StyleSheet, View } from "react-native";
import { NoteHtml } from "@/components/NoteHtml";
import { FavoritesIcon, SettingsIcon } from "@/components/Icon";
import { Text, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBarCategory";
import { useEffect, useState } from "react";
import { getCategoryNotes } from "@/services/categories";
import { fetchData } from "@/services/localstorage";
import { Note } from "@/types/apiResponses";
import { addListener, notify } from "@alexsandersarmento/react-native-event-emitter";



const CategoryNotes = () => {
  const { _id, title } = useLocalSearchParams();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Note[]>([]);

  

  

  useEffect(() => {
    // fetchNotes();
    fetchData("username").then((username) => {
      getCategoryNotes(username, _id as string).then((data) => {
        setData(data);
        notify("getOutCategory");
      });
    });
  }, []);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Stack.Screen
        options={{
          title: `${title}`,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer,
          },
        }}
      />
      <StatusBar />
      <SearchBar
        placeholder="Search Notes..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <CardNote
            _id={item._id as string}
            title={item.title}
            content={item.content}
            priority={item.priority}
            favorite={item.favorite}
            categories={item.categories}
          />
        )}
        keyExtractor={(item) => {
          return item._id ? item._id.toString() : "UNDEFINED";
        }}
      />
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

export default CategoryNotes;
