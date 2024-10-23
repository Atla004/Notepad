import React, { useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import EmojiModal from "react-native-emoji-modal";
import { Button } from "react-native-paper";

export const SelectEmoji = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleEmojiSelected = (emoji: string | null) => {
    setSelectedEmoji(emoji);
    setIsModalVisible(false); // Cierra el modal después de seleccionar un emoji
  };

  //<Button title="Select Emoji" onPress={() => setIsModalVisible(true)} />
  return (
    <View style={styles.container}>
      <Button
        style={styles.emojiContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.emojiText}>{selectedEmoji}</Text>
      </Button>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <EmojiModal
          onEmojiSelected={handleEmojiSelected}
          searchStyle={{ display: "none" }}
          headerStyle={{ display: "none" }}
          emojiSize={50}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  emojiText: {
    fontSize: 30,
    textAlign: "center",
    flexShrink: 1,
    flexGrow: 1,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SelectEmoji;
