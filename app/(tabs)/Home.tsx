import { useState } from "react";
import { FlatList, StyleSheet, StatusBar, View, Pressable } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import FABNewNote from "@/components/FABNewNote";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBar";

const data = [
  {
    id: 1,
    title: "Sin ganas de vivir",
    description: "porque...",
  },
  {
    id: 2,
    title: "a veces pienso...",
    description: "es mentira",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.colors.surface }, { height: "100%" }]}
    >
      <SearchBar
        placeholder="Search Notes..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <CardNote title={item.title} description={item.description} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <FABNewNote />
    </View>
  );
}

const styles = StyleSheet.create({});
