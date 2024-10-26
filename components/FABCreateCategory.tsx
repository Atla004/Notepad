import { fetchData } from "@/services/localstorage";
import { createNote } from "@/services/notes";
import { Note } from "@/types/apiResponses";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import SelectEmoji from "./SelectEmoji";
import { notify } from "@alexsandersarmento/react-native-event-emitter";
import { createCategory } from "@/services/categories";


const FABCreateCategory = () => {
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [userError, setUserError] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  const theme = useTheme();




  const handleCategoryTextChange = (text: string) => {
    setCategoryName(text);
    if (!text) {
      setUserError("Category name cannot be empty.");
      return;
    }
    if (text.length > 15) {
      setUserError("Category name is too long.");
      return;
    }
    setUserError('')
  }

  const handlerNewCategories = async () => {
    try {
      if (!categoryName) {
        setUserError("Category name cannot be empty.");
        return;
      }
      if (categoryName.length > 15) {
        setUserError("Category name is too long.");
        return;
      }
      hideDialog();
      const [username, categoryEmoji] = await Promise.all([
        fetchData("username"),
        fetchData("categories"),
      ]);
      await createCategory(username, {
        title: categoryName,
        emoji: categoryEmoji,
      });
      notify("addCategory", {title: categoryName, emoji: categoryEmoji});
    } catch (error) {
      console.log("Error creating category: ", error);
    }
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
    dialog: {
      display: "flex",
      position: "relative",
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 20
    },
    btn: {
      marginTop: 15,
    },
    containerCategory: {
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems:"center",
      height: 70
    },
    inputCategory: {
      // marginVertical: 10,
      width: 220,
      // height: 60,
      padding: 0,
      flexGrow: 0,
      maxHeight: 50,
      textAlignVertical: 'center'
      // marginHorizontal: 10,
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
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>New Category</Dialog.Title>
          <Dialog.Content>
            <View style={styles.containerCategory}>
              <TextInput
                style={styles.inputCategory}
                label="Category Name"
                value={categoryName}
                onChangeText={handleCategoryTextChange}
                mode="outlined"

              />
              <SelectEmoji />
            </View>
            <View style={styles.errorContainer}>
              {userError ? (
                <Text style={styles.errorText}>{userError}</Text>
              ) : <Text>{""}</Text>}
            </View>

          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handlerNewCategories}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};


export default FABCreateCategory;
