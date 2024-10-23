import * as React from "react";
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

export default function AddCategoryDialog() {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const theme = useTheme();

  return (
    <View>
      <Button
        icon="plus"
        mode="contained"
        onPress={showDialog}
        style={[styles.btn, { backgroundColor: theme.colors.tertiary }]}
      >
        {" "}
        New Category
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title>New Category</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Category Name" />
            <SelectEmoji />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  dialog: {
    elevation: 100000000000, // Cambia la elevación en Android
    zIndex: 10000000000000, // Cambia el zIndex en iOS
  },
  btn: {
    marginVertical: 10,
  },
});
