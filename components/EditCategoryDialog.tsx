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
import { editCategory } from "@/services/categories";
import { fetchData } from "@/services/localstorage";
import { useState } from "react";
import {
  addListener,
  notify,
} from "@alexsandersarmento/react-native-event-emitter";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export default function EditCategoryDialog() {
  const [visible, setVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [userError, setUserError] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setUserError("");
    setCategoryName("");
  };
  const [id, setid] = useState("");
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("");

  addListener("showdialog", (_id, c_title, c_emoji) => {
    showDialog();
    setid(_id);
    setTitle(c_title);
    setCategoryName(c_title);
    setEmoji(c_emoji);
  });

  const theme = useTheme();

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

      if (title === categoryName && categoryEmoji === emoji) {
        //si el titulo es igual al nuevo nombre y el emoji es igual al emoji anterior
        return;
      }

      notify("editCategory", { _id: id, emoji:categoryEmoji, title:categoryName });
      
      if (title !== categoryName) {
        await editCategory(username, id, {
          title: categoryName,
        });
        return;
      }

      if (categoryEmoji !== emoji) {
        console.log("emoji", emoji);
        console.log("categoryEmoji", categoryEmoji);
        await editCategory(username, id, {
          emoji: categoryEmoji,
        });
        return;
      }



      await editCategory(username, id, {
        title: categoryName,
        emoji: categoryEmoji,
      });
    } catch (error) {
      console.log("Error Editing category: ", error);
      return;
    }
  };

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
      backgroundColor: theme.colors.primaryContainer
    },
    errorText: {
      color: "red",
      // alignSelf: "center",
      marginBottom: 5,
      marginLeft: 10,
      // textAlign: "left"
    },
    errorContainer: {
    },
  });
  

  return (
    <View>
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
            <View>
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

