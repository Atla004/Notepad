import { storeData } from "@/services/localstorage";
import { storeLocalNote } from "@/services/notelocalstorage";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import EmojiModal from "react-native-emoji-modal";
import { Button } from "react-native-paper";

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

  return (
    <View style={styles.container}>
      <Button
        style={styles.emojiContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.emojiText}>{selectedEmoji}d</Text>
      </Button>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <EmojiModal
          onEmojiSelected={handleEmojiSelected}
          searchStyle={{ display: "none" }}
          headerStyle={{ display: "none" }}
          emojiSize={50}
          onPressOutside={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

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
    width: 50,
    height: 50,
    padding: 0,
    paddingTop: 5,
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export default SelectEmoji;
