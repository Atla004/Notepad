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
import { notify } from "@alexsandersarmento/react-native-event-emitter";

export default function AddCategoryDialog() {
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
      notify("newCategory");
    } catch (error) {
      console.log("Error creating category: ", error);
    }
  };
  const styles = StyleSheet.create({
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
      textAlignVertical: 'center',
      // marginHorizontal: 10,
      backgroundColor: theme.colors.surface
    },
    errorText: {
      color: "red",
      // alignSelf: "center",
      marginBottom: 5,
      marginLeft: 10,
      // textAlign: "left"
    },
    errorContainer: {
    }
  });

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
                label={<Text style={{color: theme.colors.onSurface}}>Category Title</Text>}
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
    </View>
  );
}


