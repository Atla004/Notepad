import { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Avatar, Card, IconButton, Text } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import FABNewNote from "@/components/FABNewNote";

const data = [
  {
    title: "Title 1",
    description: "Description 1",
  },
  {
    title: "Title 1",
    description: "Description 1",
  },
];

const Note = () => {
  return (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Text>Card content</Text>
      </Card.Content>
    </Card>
  );
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList data={data} renderItem={() => <Note />} />
      <FABNewNote />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexGrow: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
}); 
