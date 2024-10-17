import { Card, Chip, Text, useTheme } from "react-native-paper";
import { CardNoteProps } from "@/types/types";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import { tags } from "react-native-svg/lib/typescript/xmlTags";

const CardNote = ({ title, description }: CardNoteProps) => {
  const goToNote = () => {
    console.log("Go to Note");
    router.push({
      pathname: `/${title}`,
      params: { title, description },
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
          <Chip style={styles.importanceTag}>
            <Text variant="labelSmall">ONEPIZZA</Text>
          </Chip>
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
