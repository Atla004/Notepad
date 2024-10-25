import { Card, Chip, Text, useTheme } from "react-native-paper";
import { CardNoteProps } from "@/types/types";
import { router, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";
import { storeLocalNote } from "@/services/notelocalstorage";
import { useEffect, useState } from "react";
import { addListener, notify } from "@alexsandersarmento/react-native-event-emitter";

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

  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();


  const goToNote = async () => {
    notify("goToNote");
    setIsDisabled(true);
    console.log("Go to Note with id: ", title);
 
    await storeLocalNote({ _id, title, content, priority, favorite, categories });
    router.push({
      pathname: `/${title}`,
      params: { _id , title},
    });

  };
  const theme = useTheme();

  addListener('disable',() => {
    setIsDisabled(false);
  });

  return (
    <Card
      style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}
      onPress={goToNote}
      disabled={isDisabled}
    >
      <Card.Title
        title={<Text style={styles.cardTitle}>
          {title}
        </Text>}
        subtitle={
          <HTMLView
            value={`${(content ?? "").slice(0, 25)}${
              (content ?? "").length > 25 ? "..." : ""
            }`
              .replaceAll("\n", "")
              .replaceAll("<p>", "")
              .replaceAll("</p>", "")
              .replaceAll("<br>", "")
              .replace(/ /, "")
            }
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
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20
  },
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
