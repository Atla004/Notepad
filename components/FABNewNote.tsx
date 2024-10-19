import { fetchData } from "@/services/localstorage";
import { createNote } from "@/services/notes";
import { Note } from "@/types/apiResponses";
import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

interface FABNewNoteProps {
  onNewNote: () => void;
}

const FABNewNote = ( {onNewNote}: FABNewNoteProps) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const [noteName, setNoteName] = useState("");
  const theme = useTheme();

  const newNote = async (noteName: string) => {
    const username = await fetchData("username");
    console.log("este es el username",username);
    const note: Note = {
      title: noteName,
      content: "",
      categories: [],
      priority: 0,
      favorite: false,
    };
    await createNote(username, note);
    hideDialog();
    onNewNote();
  };

  return (
    <>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => showDialog()}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ borderRadius: 30 }}
        >
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
            <Button onPress={() => newNote(noteName)}>Done</Button>
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
    borderRadius: 20,
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
