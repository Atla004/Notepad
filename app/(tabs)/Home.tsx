import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, StatusBar, View, Pressable } from "react-native";
import { ActivityIndicator, Button, Searchbar, useTheme } from "react-native-paper";
import FABNewNote from "@/components/FABNewNote";
import CardNote from "@/components/CardNote";
import SearchBar from "@/components/SearchBar";
import { getAllNotes } from "@/services/notes";
import { fetchData, storeData } from "@/services/localstorage";
import { Note } from "@/types/apiResponses";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { addListener } from "@alexsandersarmento/react-native-event-emitter";


export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useFocusEffect(
    useCallback(() => {
      console.log('nigger')
      // router.dismissAll()
      storeData('active-tab', 'Home')
      getNotes();
      
      return () => {};
    }, [])
  );

  const changeLoading = () => {
    setLoading(true);
  };

  addListener('goToNote', changeLoading);





  const getNotes = async (): Promise<Note[]> => {
    try {
      console.log("getNotes");
      const username = await fetchData("username");
      const dataNotes = await getAllNotes(username);
      if (dataNotes !== undefined) {
        setData(dataNotes);
      }
      //console.log("dataNotes: ", JSON.stringify(dataNotes, null, 2));
      return data;
    } catch (error) {
      console.error("Error getting notes: ", error);
      return [];
    }finally{
      setLoading(false);
    }
  };

  const handleNewNote = (note:Note): void => {
    console.log("handleNewNote", note);
    console.log("filteredData", filteredData);

    filteredData.push(note);
    console.log("filteredData 2", filteredData);
    getNotes();
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => b.priority - a.priority)
  const theme = useTheme();


  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center' }]}>
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

      <FABNewNote onNewNote={handleNewNote} />
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
