import { useState } from "react";
import { FlatList, StyleSheet, StatusBar, View, Pressable } from "react-native";
import { Searchbar } from "react-native-paper";
import FABNewNote from "@/components/FABNewNote";
import CardNote from "@/components/CardNote";
import { FavoritesIcon,SunIcon } from "@/components/Icon";
import { router } from "expo-router";

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
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Searchbar
        placeholder="Search notes..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        right={(props) => (
          <>
          <Pressable
            onPress={() => router.push({pathname: `../Profile`})}
          >
            <FavoritesIcon/>
          </Pressable>
        </>
        )}

        


      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardNote title={item.title} description={item.description} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <FABNewNote />
    </>
  );
}

const styles = StyleSheet.create({



});
