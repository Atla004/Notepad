import { useCallback, useState } from "react";
import { FlatList, StyleSheet, StatusBar, View } from "react-native";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBar";
import { useTheme } from "react-native-paper";
import { fetchData } from "@/services/localstorage";
import { Note } from "@/types/apiResponses";
import { getAllNotes } from "@/services/notes";
import { useFocusEffect } from "expo-router";

export default function Favorites() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Note[]>([]);

  const getData = async () => {
    const username = await fetchData("username");
    try {
      const dataNotes = await getAllNotes(username);
      if (dataNotes !== undefined) setData(dataNotes);
      console.log(JSON.stringify(data, null, 2));
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

  const handleNewNote = () => {
    getData(); // Actualiza los datos después de crear una nueva nota
  };

  const filteredData = data.filter(
    (item) =>
      item.favorite === true &&
      item.title.toLowerCase().includes(search.toLowerCase())
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
          <CardNote
            _id={item._id}
            title={item.title}
            description={item.content}
            priority={item.priority}
            favorite={item.favorite}
          />
        )}
        keyExtractor={(item) => {
          return item._id ? item._id.toString() : "UNDEFINED";
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
