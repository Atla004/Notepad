import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, StatusBar, View, Pressable } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import FABNewNote from "@/components/FABNewNote";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBar";
import { getAllNotes } from "@/services/notes";
import { fetchData } from "@/services/localstorage";
import { Note } from "@/types/apiResponses";
import { router, useFocusEffect, useNavigation } from "expo-router";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Note[]>([]);
  const navigator = useNavigation();

  useFocusEffect(
    useCallback(() => {
      
      getNotes();
      
      return () => {};
    }, [])
  );

  const getNotes = async (): Promise<Note[]> => {
    console.log("getNotes");
    const username = await fetchData("username");
    try {
      const dataNotes = await getAllNotes(username);
      if (dataNotes !== undefined) {
        setData(dataNotes);
      }
      //console.log("dataNotes: ", JSON.stringify(dataNotes, null, 2));
    } catch (error) {
      console.error("error retrieving the notes ", error);
    }
    return data;
  };

  const handleNewNote = (): void => {
    getNotes();
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => b.priority - a.priority)
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.colors.surface }, { height: "100%" }]}
    >
      <StatusBar backgroundColor={theme.colors.surface} />
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

      <FABNewNote onNewNote={handleNewNote} />
    </View>
  );
}

const styles = StyleSheet.create({});
