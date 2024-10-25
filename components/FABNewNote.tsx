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
  onNewNote: (note: Note) => void;
}

const FABNewNote = ({ onNewNote }: FABNewNoteProps) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setUserError("");
    setVisible(false);
    console.log("hideDialog");
    setNoteName("");
  };
  const [noteName, setNoteName] = useState("");
  const [isDebounced, setIsDebounced] = useState(false);
  const theme = useTheme();
  const [userError, setUserError] = useState("");

  function isPasswordValid(password: string): boolean {
    // Expresión regular para verificar la ausencia de caracteres especiales excepto '-' y '_'
    const specialCharPattern = /[^a-zA-Z0-9-_]/;
    return !specialCharPattern.test(password);
  }

  const newNote = async (noteName: string) => {
    try {
      console.log("este es el noteName", isDebounced);
      if (isDebounced) return;
      setIsDebounced(true);

      if (noteName === "") {
        console.log("noteNameddddd");
        setUserError("Note name cannot be empty.");
        setIsDebounced(false);
        return;
      }
      if (noteName.length > 30) {
        setUserError("Note name is too long.");
        setIsDebounced(false);
        return;
      }
      if (!isPasswordValid(noteName)) {
        setUserError("no se admiten caracteres especiales");
        setIsDebounced(false);
        return;
      }

      hideDialog();
      const username = await fetchData("username");
      console.log("este es el username", username);
      const note: Note = {
        title: noteName,
        content: "",
        categories: [],
        priority: 0,
        favorite: false,
      };
      onNewNote(note);
      await createNote(username, note);
      setIsDebounced(false);
    } catch (e) {
      console.error("Error creating note: ", e);
    }
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
            {userError ? (
              <Text style={styles.errorText}>{userError}</Text>
            ) : null}
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
  errorText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 5,
  },
});

export default FABNewNote;
