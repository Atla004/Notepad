import Background from "@/components/Background";
import Emoji from "@/components/Emoji2";
import SearchBar from "@/components/SearchBar";
import { getAllCategories } from "@/services/categories";
import { fetchData } from "@/services/localstorage";
import { Category } from "@/types/apiResponses";
import {
  addListener,
  notify,
  removeListener,
} from "@alexsandersarmento/react-native-event-emitter";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text,
  Pressable,
} from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";

const data = [
  {
    _id: "67197377f16dd83e3240d1f1",
    emoji: "😍",
    owner: "6714818962ecd2db0e161d15",
    title: "hiw",
  },
  {
    _id: "67197377f16dd83e3240d1f1",
    emoji: "😍",
    owner: "6714818962ecd2db0e161d15",
    title: "hiddw",
  },
];

export default function Categories() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const goToCategory = (item: Category) => {
    removeListener("goToCategory");
    setLoading(true);
    console.log(`/${item.title}`);
    router.push({
      pathname: `/dinamicCategory/${item.title}`,
      params: { _id: item._id, title: item.title },
    });
  };

  addListener("getOutCategory", () => {
    console.log("getOutCategory");
    setLoading(false);
  });
  addListener("goToCategory", goToCategory);

  useEffect(() => {
    fetchData("username").then((res) => {
      getAllCategories(res).then((res) => {
        console.log(res[0]);
        setItems(res);
      });
    });
  }, []);

  const [items, setItems] = useState<Category[]>([]);

  const filteredData = items.filter((item) =>
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
              notify("goToCategory", item);
            }}
          >
            <Text style={styles.text}>
              <Emoji symbol={item.emoji} />
            </Text>
            <Text style={[styles.itemName, { color: theme.colors.shadow }]}>
              {item.title}
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
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
