import { Card, Text } from "react-native-paper";
import { CardNoteProps } from "@/types/types";
import { router } from "expo-router";

const CardNote = ({title, description}: CardNoteProps) => {


  const goToNote = () => {
    console.log("Go to Note");
    router.push({
      pathname: `/${title}`,
      params: { title, description }
    });

  };

  return (
    <Card onPress={goToNote}>
      <Card.Title title={title} subtitle={description}/>
    </Card>
  );
};


export default CardNote;