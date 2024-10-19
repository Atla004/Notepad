import { Card, Chip, Text, useTheme } from "react-native-paper";
import { CardNoteProps } from "@/types/types";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { tags } from "react-native-svg/lib/typescript/xmlTags";
import Categories from "@/app/(tabs)/Categories";
import { useContext } from "react";
import { NoteContext } from "@/app/NoteContext";

const priorities = [
  { name: "", color: "#" },
  { name: "Slightly important", color: "#" },
  { name: "Important", color: "#" },
  { name: "Fairly Important", color: "#" },
  { name: "Very Important", color: "#" },
  { name: "Decoupled", color: "#",},
];



const CardNote = ({ title, description, priority, favorite, _id, categories}: CardNoteProps) => {
  const {noteData, setNoteData} = useContext(NoteContext);

  const waitForContext = async ({ title, description, priority, favorite, _id, categories}: CardNoteProps) => {
    return new Promise((rs, rj) => {
      try {
        setNoteData({ title, description, priority, favorite, _id, categories});
        rs(true);
      }
      catch (error) {
        rj();
      }
    })
  }
  const goToNote = async () => {
    console.log("Go to Note");
    await waitForContext({ title, description, priority, favorite, _id, categories})
    router.push({
      pathname: `/${title}`,
      params: { title, description, priority, _id, favorite: favorite ? "true" : "false",categories },
    });
  };
  const theme = useTheme();

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}
      onPress={goToNote}
    >
      <Card.Title
        title={title}
        subtitle={description}
        right={(props) => (
          priority !== 0 ? (
            <Chip style={styles.importanceTag}>
              <Text variant="labelSmall">{priorities[priority].name}</Text>
            </Chip>
          ) : null
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 6,
  },
  importanceTag: {
    marginRight: 10,
    marginTop: 28,
    height: 25,
    borderRadius: 6,
  },
});

export default CardNote;
