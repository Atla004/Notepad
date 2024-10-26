import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Alert
} from "react-native";
import {
  TextInput,
  Divider,
  Dialog,
  Portal,
  Text,
  Button,
  useTheme,
} from "react-native-paper";
import { Pressable } from "react-native";
import { TrashIcon } from "@/components/Icon";
import CategoryMultiSelect from "@/components/CategoryMultiSelect";
import DropdownPriority from "@/components/DropdownPriority";
import {
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { deleteNote, editNote } from "@/services/notes";
import {
  fetchData
} from "@/services/localstorage";
import { editLocalNote, getLocalNote } from "@/services/notelocalstorage";
import { NoteRequest } from "@/types/apiResponses";
import HeaderBackButton from "./HeaderBackButton";
import { notify } from "@alexsandersarmento/react-native-event-emitter";

const EditNoteProperties = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const listenerRef = useRef<((e: any) => void) | null>(null);
  const { _id, priority, title } = useLocalSearchParams();
  const [isDebounced, setIsDebounced] = useState(false);
  const shouldHandleBeforeRemove = useRef<boolean>(true);


  const [titleState, setTitleState] = useState<string>(title.toString());
  const defaultTitle = title.toString();
  const refIsValidTitle = useRef<boolean>(true);

  const [userError, setUserError] = useState("");

  const deleteNoteById = async () => {
    if (isDebounced) return; 
    setIsDebounced(true); 
    
    hideDialog();
    const username = await fetchData("username");
    const id = _id.toString();

    await deleteNote(username, id);
    router.push("/Home");
    setIsDebounced(false);
  };

  const navigation = useNavigation();

  const saveNoteProperties = async () => {
    try {
      console.log("saveNoteContent method");
      const username = await fetchData("username");
      const data = await getLocalNote();


      const dataToSave: NoteRequest = {
        _id: data._id as string,
        title: userError?defaultTitle:titleState,
        categories: data.categories,
      };
      await editNote(username, dataToSave);

      await editLocalNote(dataToSave);

    } catch (error) {
      console.log("Error al guardar la nota", error);
    }
  };


  useEffect(() => {
    const onBeforeRemove = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if( userError !== ""){
        console.log("Error title");
        Alert.alert(
          "Error",
           userError ,
          [
            {
              text: "OK",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        return;
      }

      console.log("good title");

      if (!shouldHandleBeforeRemove.current) return;
      shouldHandleBeforeRemove.current = false;

      //guardar los cambios
      saveNoteProperties();


      router.dismiss(1);
      router.push({
        pathname: `/${titleState}`,
        params: { _id, title: titleState },
      });
    };

    // Eliminar el listener existente si hay uno
    if (listenerRef.current) {
      console.log("Removing existing beforeRemove listener");
      navigation.removeListener("beforeRemove", listenerRef.current);
    }

    // Añadir el nuevo listener y almacenarlo en la referencia
    navigation.addListener("beforeRemove", onBeforeRemove);
    listenerRef.current = onBeforeRemove;

    // Eliminar el listener cuando el componente se desmonta
    return () => {
      if (listenerRef.current) {
        navigation.removeListener("beforeRemove", listenerRef.current);
        listenerRef.current = null;
      }

      
    };
  }, [navigation, _id, titleState]);

  function isTextValid(password: string): boolean {
    // Expresión regular para verificar la ausencia de caracteres especiales excepto '-' y '_'
    const specialCharPattern = /[^a-zA-Z0-9-_-\s]/;
    return !specialCharPattern.test(password);
  }

  const handleChangeText = useCallback((text: string) => {
    setTitleState(text);
    if (text === "") {
      setUserError("Note name cannot be empty.");
      setIsDebounced(false);
      return;
    }

    if (text.length >= 17) {
      setUserError("Note name is too long.");
      setIsDebounced(false);
      return;
    }

    if (!isTextValid(text)) {
      setUserError("Name cannot contain special characters");
      setIsDebounced(false);
      return;
    }
    setUserError("");

    
  }, []);
  

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
      maxWidth: 360,
      width: "100%",
      borderColor: theme.colors.shadow,
      // borderBottomWidth: 1,
      color: theme.colors.onSurface,
      alignSelf: "center",
      borderRadius: 8,
      backgroundColor: theme.colors.primaryContainer,
      // elevation: 0
    },
    card: {
      width: 320,
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
      paddingLeft: 45,
      alignItems:"flex-end",
      width: 80,
    },
    errorText: {
      color: "red",
      alignSelf: "center",
      marginBottom: 5,
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Stack.Screen
        options={{
          title: `Edit Note `,
          headerShown: true,
          headerTintColor: theme.colors.onSurface,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer, // Cambia este valor al color que desees
          },
          headerLeft: HeaderBackButton,
          headerRight: () => {
            return (
              <>
                {/* <StatusBar /> */}
                <View style={styles.headersLeft}>
                  <Pressable onPress={showDialog}>
                    <TrashIcon />
                  </Pressable>
                </View>
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}
                  style={{backgroundColor: theme.colors.primaryContainer}}>
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
                        onPress={() => deleteNoteById()}
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
      <TextInput
        style={styles.input}
        label={<Text style={{color: theme.colors.onSurface}}>Note Title</Text>}
        outlineColor={theme.colors.onSurface}
        
        value={titleState}
        mode="outlined"
        onChangeText={(text) => handleChangeText(text)}
        theme={{
          roundness: 8,
        }}
      />
      {userError ? (
        <Text style={styles.errorText}>{userError}</Text>
      ) : null}
      <Divider
        bold
        style={[styles.divider, { backgroundColor: theme.colors.shadow }]}
      />
      <Text style={styles.textCloseToDivider} variant="bodySmall">
        Categories
      </Text>

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
      <DropdownPriority priority={priority.toString()} _id={_id.toString()} />
    </View>
  );
};


export default EditNoteProperties;
