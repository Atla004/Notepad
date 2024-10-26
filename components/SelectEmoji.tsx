import { storeData } from "@/services/localstorage";
import { storeLocalNote } from "@/services/notelocalstorage";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import EmojiModal from "react-native-emoji-modal";
import { Button, useTheme } from "react-native-paper";

interface SelectEmojiProps {
  defaultEmoji?: string;
}

export const SelectEmoji = ({defaultEmoji}: SelectEmojiProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(defaultEmoji? defaultEmoji: null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleEmojiSelected = (emoji: string | null) => {
    setSelectedEmoji(emoji);
    console.log("emoji", selectedEmoji);
    setIsModalVisible(false); // Cierra el modal después de seleccionar un emoji
  };

  useEffect(() => {
    console.log("selectedEmoji", selectedEmoji);
    if (selectedEmoji === null || selectedEmoji === "") {
      storeData("categories", "📝");
      setSelectedEmoji("📝");
    } else {
      console.log(selectedEmoji);
      storeData("categories", selectedEmoji);
    }
  }, [selectedEmoji]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
    },
    emojiText: {
      fontSize: 15,
      textAlign: "center",
      flexShrink: 1,
      flexGrow: 1,
      overflow: "visible",
      maxHeight: 200,
      minHeight: 200,
    },
    emojiContainer: {
      // width: 50,
      height: 44,
      marginTop: 6,
      // padding: 0,
      // paddingTop: 5/,
      verticalAlign: "middle",
      // alignSelf: "center",
      backgroundColor: "white",
      borderColor: theme.colors.shadow,
      borderWidth: 1,
      borderRadius: 5
    },
  });

  return (
    <View style={styles.container}>
      <Button
        style={styles.emojiContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.emojiText}>{selectedEmoji}</Text>
      </Button>

      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <EmojiModal
          onEmojiSelected={handleEmojiSelected}
          searchStyle={{}}
          // headerStyle={{ display: "none" }}
          emojiSize={40}
          onPressOutside={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};



export default SelectEmoji;
