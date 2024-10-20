import React, { useCallback, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  Chip,
  TextInput,
  Divider,
  Dialog,
  Portal,
  Text,
  Button,
  useTheme,
} from "react-native-paper";
import { Pressable } from "react-native";
import { FavoritesIcon, TrashIcon } from "@/components/Icon";
import CategoryMultiSelect from "@/components/CategoryMultiSelect";
import DropdownPriority from "@/components/DropdownPriority"; // Ensure DropdownPriority accepts style prop
import { router, Stack, useFocusEffect } from "expo-router";
import { CloseIcon } from "@/components/Icon";
import { StatusBar } from "expo-status-bar";
import { deleteNote } from "@/services/notes";
import {
  editJSONData,
  fetchData,
  getJSONData,
  removeData,
} from "@/services/localstorage";

const EditNoteProperties = () => {
  const theme = useTheme();
  const [noteName, setNoteName] = useState("");
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  const borrarNota = async () => {
    const username = await fetchData("username");
    // const noteId = noteData._id ?? "";
    await removeData("active-note");
    // deleteNote(username, noteId);
    router.push("/Home");
    hideDialog();
  };

  const data = [
    { id: 1, title: " 1" },
    { id: 2, title: "Category 2" },
    { id: 3, title: "Category 3" },
    { id: 4, title: "Category 4ffff" },
    { id: 5, title: "Category 5" },
    { id: 6, title: "Category 6" },
    { id: 7, title: "Category 7" },
    { id: 8, title: "Category 8" },
    { id: 9, title: "Category 9" },
    { id: 10, title: "Category 10" },
  ];

  const [favoriteState, setFavoriteState] = useState(false);
  const [priorityState, setPriorityState] = useState(0);
  const [titleState, setTitleState] = useState("");

  useFocusEffect(
    useCallback(() => {
      //saveNote();
    }, [])
  );

  const saveNote = async () => {
    const data = await getJSONData("active-note");
    console.log("data", data);
    setFavoriteState(data.favorite);
    setPriorityState(data.priority);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Stack.Screen
        options={{
          title: `Edit Note `,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer, // Cambia este valor al color que desees
          },
          headerRight: () => {
            return (
              <>
                <StatusBar />
                <View style={styles.headersLeft}>
                  <Pressable
                    onPress={async () => {
                      setFavoriteState(!favoriteState);
                      await editJSONData("active-note", {
                        favorite: !favoriteState,
                      });
                    }}
                  >
                    <FavoritesIcon />
                  </Pressable>
                  <Pressable onPress={showDialog}>
                    <TrashIcon />
                  </Pressable>
                </View>
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" />
                    <Dialog.Title style={styles.dialogTitle}>
                      Confirm
                    </Dialog.Title>
                    <Dialog.Content>
                      <Text variant="bodyMedium" style={styles.dialogContent}>
                        Are you sure you want to delete this note?
                      </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button onPress={hideDialog} style={styles.dialogButton}>
                        Cancel
                      </Button>
                      <Button
                        onPress={() => borrarNota()}
                        style={[
                          styles.dialogButton,
                          styles.deleteButton,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <Text style={{ color: "white" }}>Delete</Text>
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </>
            );
          },
        }}
      />

      <Divider
        bold
        style={[styles.divider, { backgroundColor: theme.colors.shadow }]}
      />
      <Text style={styles.textCloseToDivider} variant="bodySmall">
        Note Name
      </Text>
      <TextInput
        style={styles.input}
        label="name"
        value={noteName}
        mode="outlined"
        onChangeText={(text) => setNoteName(text)}
        theme={{
          roundness: 8,
        }}
      />
      <Divider
        bold
        style={[styles.divider, { backgroundColor: theme.colors.shadow }]}
      />
      <Text style={styles.textCloseToDivider} variant="bodySmall">
        Categories
      </Text>

      {/*       <ScrollView
        style={[
          styles.scrollView,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <View
          style={[
            styles.chipContainer,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          {data.map((item) => (
            <Chip
              key={item.id}
              icon="close"
              onPress={() => console.log("close")}
              style={[styles.chips, { backgroundColor: theme.colors.tertiary }]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                variant="bodySmall"
                style={[
                  styles.chipText,
                  { color: theme.colors.primaryContainer },
                ]}
              >
                {item.title}
              </Text>
            </Chip>
          ))}
        </View>
      </ScrollView> */}

      <CategoryMultiSelect />
      <Divider
        bold
        style={[styles.divider, { backgroundColor: theme.colors.shadow }]}
      />
      <Text
        style={[styles.textCloseToDivider, { marginBottom: 10 }]}
        variant="bodySmall"
      >
        Priority
      </Text>
      <DropdownPriority />
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    margin: 10,
  },
  scrollView: {
    maxHeight: 100,
    marginBottom: 16,
    marginTop: 8,
    marginHorizontal: 18,
  },
  input: {
    maxWidth: 320,
    width: "100%",
    alignSelf: "center",
    borderRadius: 40,
  },
  card: {
    width: 250,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  title: {
    textAlign: "center",
  },
  chipContainer: {
    borderRadius: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignSelf: "center",
  },
  chips: {
    margin: 4,
    width: 100,
    borderRadius: 5,
  },
  chipText: {
    width: "100%",
  },
  dropdown: {
    marginTop: 16,
  },
  divider: {
    marginVertical: 16, // Adjust the value to increase or decrease the space
    marginHorizontal: 10,
  },
  textCloseToDivider: {
    marginTop: -8,
    marginLeft: 16,
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "red",
  },
  dialogContent: {
    textAlign: "center",
    fontSize: 16,
  },
  dialogButton: {
    marginHorizontal: 10,
  },
  deleteButton: {
    borderRadius: 8,
  },
  headersLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: 80,
  },
});

export default EditNoteProperties;
