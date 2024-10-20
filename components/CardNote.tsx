import { Card, Chip, Text, useTheme } from "react-native-paper";
import { CardNoteProps } from "@/types/types";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";

const priorities = [
  { name: "", color: "#" },
  { name: "Slightly important", color: "#" },
  { name: "Important", color: "#" },
  { name: "Fairly Important", color: "#" },
  { name: "Very Important", color: "#" },
  { name: "Decoupled", color: "#" },
];

const CardNote = ({
  title,
  description,
  priority,
  favorite,
  _id,
  categories,
}: CardNoteProps) => {
  const goToNote = async () => {
    console.log("Go to Note");

    router.push({
      pathname: `/${title}`,
      params: {
        title,
        description,
        priority,
        _id,
        favorite: favorite ? "true" : "false",
        categories,
      },
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
        subtitle={
          <HTMLView
            value={`${(description ?? "").slice(0, 25)}${
              (description ?? "").length > 25 ? "..." : ""
            }`
              .replace("\n", " ")
              .replace("<p>", " ")
              .replace("</p>", " ")
              .replace("<br>", " ")}
          />
        }
        right={(props) =>
          priority !== 0 ? (
            <Chip style={styles.importanceTag}>
              <Text variant="labelSmall">{priorities[priority].name}</Text>
            </Chip>
          ) : null
        }
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
