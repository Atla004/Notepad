import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, StatusBar, View, Pressable } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import FABNewNote from "@/components/FABNewNote";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBar";
import { getAllNotes } from "@/services/notes";
import { fetchData } from "@/services/localstorage";
import { Note } from "@/types/apiResponses";
import { useFocusEffect } from "expo-router";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Note[]>([]);

  const getData = async () => {
    const username = await fetchData("username");
    try {
      const dataNotes = await getAllNotes(username);
      console.log("esperando la dataaaaaa", dataNotes);
      if (dataNotes !== undefined)
      setData(dataNotes);
    } catch (error) {
      console.log("error al agarrarmela ", error);
    }
    return data;
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );
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
          <CardNote title={item.title} description={item.content} />
        )}
        keyExtractor={(item) => {
          return item._id ? item._id.toString() : "UNDEFINED";
        }}
      />

      <FABNewNote />
    </View>
  );
}

const styles = StyleSheet.create({});
