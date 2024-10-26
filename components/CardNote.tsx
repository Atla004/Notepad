import { Card, Chip, Text, TouchableRipple, useTheme } from "react-native-paper";
import { CardNoteProps } from "@/types/types";
import { router, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import HTMLView from "react-native-htmlview";
import { storeLocalNote } from "@/services/notelocalstorage";
import { useEffect, useState } from "react";
import { addListener, notify } from "@alexsandersarmento/react-native-event-emitter";

const priorities = [
  "", "SLIGHTLY IMPORTANT", "IMPORTANT", "FAIRLY IMPORTANT", "VERY IMPORTANT", "TOP PRIORITY",
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

  const fontSizeByPriority = [20, 17.5, 18, 18, 18, 18]

  const styles = StyleSheet.create({
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    card: {
      margin: 10,
      borderRadius: 6,
    },
    importanceTag: {
      marginRight: 8,
      marginTop: 30,
      height: 25,
      borderRadius: 6,
      backgroundColor: theme.colors.scrim
    },
    importanceText: {
      textAlignVertical: "top",
      fontWeight: 'bold',
      fontSize: 9,
      color: priority == 5 ? theme.colors.primary : theme.colors.shadow
      // padding: 0
    }
  });

  const cardContent = content.replaceAll("\n", "")
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, ' ') // Remove script tags and content
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, ' ')   // Remove style tags and content
    .replace(/<\/?[^>]+(>|$)/g, ' ')                     // Remove all other HTML tags
    .replace(/\s+/g, ' ')                               // Replace multiple spaces with a single space
    .trim(); 
  

  return (
    <TouchableRipple
      rippleColor={theme.colors.primary}
    >
      <Card
        style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}
        onPress={goToNote}
        disabled={isDisabled}
      >
        <Card.Title
          title={<Text style={styles.cardTitle}>
            {title.trim()}
          </Text>}
          subtitle={
            <HTMLView
              value={
                // cardContent
                `${(cardContent).slice(0, 28).trim()}${(content ?? "").length > 25 ? "..." : ""}`
              }
            />
          }
          right={(props) =>
            priority !== 0 ? (
              <Chip style={styles.importanceTag}>
                <Text variant="labelSmall" style={styles.importanceText}>{priorities[priority]}</Text>
              </Chip>
            ) : null
          }
          />
      </Card>
    </TouchableRipple>
  );
};



export default CardNote;
