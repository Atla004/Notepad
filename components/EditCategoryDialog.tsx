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

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>Edit Category</Dialog.Title>
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

              <SelectEmoji defaultEmoji={emoji} />
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
