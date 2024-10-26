import Background from "@/components/Background";
import Emoji from "@/components/Emoji2";
import SearchBar from "@/components/SearchBar";
import { deleteCategory, getAllCategories } from "@/services/categories";
import { fetchData, storeData } from "@/services/localstorage";
import { Category } from "@/types/apiResponses";
import {
  addListener,
  notify,
  removeListener,
} from "@alexsandersarmento/react-native-event-emitter";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, StatusBar, View, Pressable } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Divider,
  Menu,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import EditCategoryDialog from "@/components/EditCategoryDialog";

const CategoryItem = ({ item }: { item: Category }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => {
    console.log("openMenu");
    setVisible(true);
  };
  const theme = useTheme();
  const closeMenu = () => setVisible(false);

  const [visibleDialog, setVisibleDialog] = useState(false);
  const showDialog = () => setVisibleDialog(true);
  const hideDialog = () => setVisibleDialog(false);

  const onPressDeleteCategory = () => {
    fetchData("username").then((res) => {
      deleteCategory(res, item._id as string).then(() => {
        notify("deleteCategory", item);
        hideDialog();
        setVisible(false);
      });
    });
  };

  const localStyle = StyleSheet.create({
    modalMenu: {
      backgroundColor: theme.colors.primaryContainer
    }
  })

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          ...styles.menu
        }}
      >
        <Menu
            // style={localStyle.modalMenu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Pressable 
              onPress={openMenu}
              hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
            >
              <FontAwesome6 name="ellipsis-vertical" size={24} color={theme.colors.shadow} />
            </Pressable>
          }
          contentStyle={localStyle.modalMenu}
        >
          <Menu.Item
            style={localStyle.modalMenu}
            onPress={() => {
              notify("showdialog", item._id, item.title, item.emoji);
            }}
            title="Edit"
          />
          <EditCategoryDialog />

          <Divider />
          <Menu.Item
            style={localStyle.modalMenu}
            onPress={() => {
              showDialog();
            }}
            title="Delete"
          />
          <Portal>
            <Dialog
             visible={visibleDialog} 
             onDismiss={hideDialog}
              style={localStyle.modalMenu}
            >
              <Dialog.Icon icon="alert" />
              <Dialog.Title style={styles.dialogTitle}>Confirm</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium" style={styles.dialogContent}>
                  Are you sure you want to delete this category?
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} style={styles.dialogButton}>
                  Cancel
                </Button>
                <Button
                  onPress={async () => {
                    onPressDeleteCategory();
                  }}
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
        </Menu>
      </View>
    </>
  );
};

export default function Categories() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Category[]>([]);

  const goToCategory = (item: Category) => {
    removeListener("goToCategory");
    setLoading(true);
    console.log(`/${item.title}`);
    router.push({
      pathname: `/dinamicCategory/${item.title}`,
      params: { _id: item._id, title: item.title },
    });
  };
  addListener("goToCategory", goToCategory);

  addListener("getOutCategory", () => {
    console.log("getOutCategory");
    setLoading(false);
  });

  addListener("deleteCategory", (itemDeleted) => {
    setItems(items.filter((item) => item._id !== itemDeleted._id));

    fetchData("username").then((res) => {
      getAllCategories(res).then((res) => {
        setItems(res);
      });
    });
  });

  addListener("editCategory", (itemEdited) => {
    setItems(
      items.map((item) => (item._id === itemEdited._id ? {...itemEdited,owner: item.owner} : item))
    );

    fetchData("username").then((res) => {
      getAllCategories(res).then((res) => {
        setItems(res);
      });
    });
  });

  useEffect(() => {
    fetchData("username").then((res) => {
      storeData("active-tab", "Categories");
      getAllCategories(res).then((res) => {
        console.log(res[0]);
        setItems(res);
      });
    });
  }, []);

  const filteredData = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const theme = useTheme();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={[{ backgroundColor: theme.colors.surface }, { height: "100%" }]}
    >
      <StatusBar backgroundColor={theme.colors.surface} />
      <SearchBar
        placeholder="Search Notes..."
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <FlatGrid
        itemDimension={130}
        data={filteredData}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => (
          <>
            <CategoryItem item={item} />
            <Pressable
              style={[
                styles.itemContainer,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
              onPress={() => {
                notify("goToCategory", item);
              }}
            >
              <Text style={styles.text}>
                <Emoji symbol={item.emoji} />
              </Text>
              <Text style={[styles.itemName, { color: theme.colors.shadow }]}>
                {item.title}
              </Text>
            </Pressable>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    // marginLeft: 165,
    // marginBottom: 40,
    transform: [{translateY: -55}, {translateX: 165}],
    // margin: 10,
    // backgroundColor: theme
    zIndex: 2
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    position: "relative",
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
  },

  text: {
    fontSize: 80,
    position: "absolute",
    alignSelf: "center",
    margin: "auto",
    top: 5,
    bottom: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  deleteBnt: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
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
});
