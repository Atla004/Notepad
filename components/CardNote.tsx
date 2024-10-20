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
  content,
  priority,
  favorite,
  _id,
  categories,
}: CardNoteProps) => {
  const goToNote = async () => {
    console.log("Go to Note with id: ", _id);
    router.push({
      pathname: `/${title}`,
      params: { _id , title},
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
            value={`${(content ?? "").slice(0, 25)}${
              (content ?? "").length > 25 ? "..." : ""
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
