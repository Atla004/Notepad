import { useCallback, useState } from "react";
import { FlatList, StyleSheet, StatusBar, View } from "react-native";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBar";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { fetchData } from "@/services/localstorage";
import { Note } from "@/types/apiResponses";
import { getAllNotes } from "@/services/notes";
import { useFocusEffect } from "expo-router";
import { addListener } from "@alexsandersarmento/react-native-event-emitter";

export default function Favorites() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getNotes = async (): Promise<Note[]> => {
    console.log("getNotes(favorites)");
    const username = await fetchData("username");
    try {
      const dataNotes = await getAllNotes(username);
      if (dataNotes !== undefined) setData(dataNotes);
      //console.log("dataNotes(favorites): ", JSON.stringify(dataNotes, null, 2));
    } catch (error) {
      console.error("error retrieving the notes ", error);
    }finally{
      setLoading(false);
    }
    return data;
  };

  useFocusEffect(
    useCallback(() => {
      getNotes();
    }, [])
  );

  const changeLoading = () => {
    
    setLoading(true);
  };

  addListener("goToNote", changeLoading);

  const filteredData = data.filter(
    (item) =>
      item.favorite === true &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );
  const theme = useTheme();

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
