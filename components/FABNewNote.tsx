import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

const FABNewNote = () => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [noteName, setNoteName] = useState("");

  return (
    <>
      <FAB icon="plus" style={styles.fab} onPress={() => showDialog()} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            <Text variant="titleMedium">New Note</Text>
          </Dialog.Title>
          <Dialog.Content style={styles.content}>
            <TextInput
              style={styles.input}
              label="name"
              value={noteName}
              mode="outlined"
              onChangeText={(text) => setNoteName(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },

  input: {
    maxWidth: 300,
    width: "100%",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FABNewNote;
