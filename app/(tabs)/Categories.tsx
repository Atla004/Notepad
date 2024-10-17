import Background from "@/components/Background";
import Emoji from "@/components/Emoji";
import SearchBar from "@/components/SearchBar";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Pressable,
} from "react-native";
import { useTheme } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";

const data = [
  {
    id: 1,
    title: "Sin ganas de vivir",
    description: "porque...",
  },
  {
    id: 2,
    title: "a fffveces pienso...",
    description: "es mentira",
  },
];

export default function Categories() {
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([
    { name: "TURQUOISE", code: 0x1f60a },
    { name: "EMERALD", code: 0x1f60a },
    { name: "PETER RIVER", code: 0x1f60a },
    { name: "AMETHYST", code: 0x1f60a },
    { name: "WET ASPHALT", code: 0x1f60a },
    { name: "GREEN SEA", code: 0x1f60a },
    { name: "NEPHRITIS", code: 0x1f60a },
    { name: "BELIZE HOLE", code: 0x1f60a },
    { name: "WISTERIA", code: 0x1f60a },
    { name: "MIDNIGHT BLUE", code: 0x1f60a },
    { name: "SUN FLOWER", code: 0x1f60a },
  ]);

  const filteredData = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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

      <FlatGrid
        itemDimension={130}
        data={filteredData}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.itemContainer,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
            onPress={() => {
              console.log(`./${item.name}`);
              router.push({ pathname: `./dinamicCategory/${item.name}` });
            }}
          >
            <Text style={styles.text}>
              <Emoji symbol={item.code} />
            </Text>
            <Text style={[styles.itemName, { color: theme.colors.shadow }]}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    position: "relative",
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
  },

  text: {
    fontSize: 80,
    position: "absolute",
    alignSelf: "center",
    margin: "auto",
    top: 5,
    bottom: 0,
  },
});
