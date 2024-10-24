
import { View, StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { SelectEmoji } from "./SelectEmoji";
import { createCategory } from "@/services/categories";
import { fetchData } from "@/services/localstorage";
import { useState } from "react";
import { notify } from '@alexsandersarmento/react-native-event-emitter';


export default function AddCategoryDialog() {
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [userError, setUserError] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  
  const theme = useTheme();

  const handlerNewCategories = async () => {
    try {
      if (!categoryName) {
        setUserError("Category name cannot be empty.");
        return;
      }
      if (categoryName.length > 20) {
        setUserError("Category name is too long.");
        return;
      }
          hideDialog();
          const [username,categoryEmoji] = await Promise.all([fetchData("username"),fetchData("categories")]);
          await createCategory(username, {
            title: categoryName,
            emoji: categoryEmoji,
          });
          notify("newCategory");
      
        } catch (error) {
      console.log("Error creating category: ", error);
    }
  
}

  return (
    <View>
      <Button
        icon="plus"
        mode="contained"
        onPress={showDialog}
        style={[styles.btn, { backgroundColor: theme.colors.tertiary }]}
      >
        New Category
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>New Category</Dialog.Title>
          <Dialog.Content>
            <View style={styles.containerCategory}>
              <TextInput
                style={styles.inputCategory}
                label="Category Name"
                value={categoryName}
                onChangeText={(text) => setCategoryName(text)}
              />            
              {userError ? (
                <Text style={styles.errorText}>{userError}</Text>
              ) : null}

              <SelectEmoji />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handlerNewCategories}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  dialog: {
    display: "flex",
    position: "relative",
  },
  btn: {
    marginVertical: 10,
  },
  containerCategory: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  inputCategory: {
    marginVertical: 10,
    width: 150,
    height: 50,
    padding: 0,
    flexGrow: 0,
    maxHeight: 50,

    marginHorizontal: 10,
  },  
  errorText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 5,
  },
});
