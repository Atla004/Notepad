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

  const handleNameChange = (text: string) => {
    setNoteName(text);
    if (text === "") {
      setUserError("Note title cannot be empty.");
      setIsDebounced(false);
      return;
    }
    if (text.length >= 17) {
      setUserError("Note title is too long.");
      setIsDebounced(false);
      return;
    }
    if (!isNameValid(text)) {
      setUserError("no se admiten caracteres especiales");
      setIsDebounced(false);
      return;
    }
    setUserError("");
    setIsDebounced(false);
  }

  function isNameValid(password: string): boolean {
    // Expresión regular para verificar la ausencia de caracteres especiales excepto '-' y '_'
    const specialCharPattern = /[^a-zA-Z0-9-_-\s]/;
    return !specialCharPattern.test(password);
  }

  const newNote = async (noteName: string) => {
    try {
      console.log("este es el noteName", isDebounced);
      if (isDebounced) return;
      setIsDebounced(true);

      if (noteName === "") {
        setUserError("Note title cannot be empty.");
        setIsDebounced(false);
        return;
      }
      if (noteName.length >= 17) {
        setUserError("Note title is too long.");
        setIsDebounced(false);
        return;
      }
      if (!isNameValid(noteName)) {
        setUserError("Note title cannot contain special characters");
        setIsDebounced(false);
        return;
      }

      hideDialog();
      const username = await fetchData("username");
      // console.log("este es el username", username);
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

  // const theme = useTheme();

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
      display: "flex",
      position: "relative",
      borderRadius: 20
    },
    errorText: {
      color: "red",
      textAlign:"left",
      marginLeft: 5, 
      alignSelf: "flex-start",
      marginBottom: 5,
    },
  });

  return (
    <>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary, color: theme.colors.scrim }]}
        onPress={() => showDialog()}
        background={{color: theme.colors.scrim}}
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{ borderRadius: 30, backgroundColor: theme.colors.primaryContainer }}
        >
          <Dialog.Title>
            <Text variant="titleMedium">New Note</Text>
          </Dialog.Title>
          <Dialog.Content style={styles.content}>
            <TextInput
              style={styles.input}
              label="Note Title"
              value={noteName}
              mode="outlined"
              onChangeText={handleNameChange}
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


export default FABNewNote;
