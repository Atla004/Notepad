import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddCategoryDialog from "./AddCategoryDialog";
import Emoji from "./Emoji";

const data = [
  { label: "Item 1", value: "1", code: 0x1f60a },
  { label: "Item 2", value: "2", code: 0x1f60a },
  { label: "Item 3", value: "3", code: 0x1f60a },
  { label: "Item 4", value: "4", code: 0x1f60a },
  { label: "Item 5", value: "5", code: 0x1f60a },
  { label: "Item 6", value: "6", code: 0x1f60a },
  { label: "Item 7", value: "7", code: 0x1f60a },
  { label: "Item 8", value: "8", code: 0x1f60a },
  { label: "Item 9", value: "9", code: 0x1f60a },
  { label: "Item 10", value: "10", code: 0x1f60a },
];

type ItemType = {
  label: string;
  value: string;
  code: number;
};

const CategoryMultiSelect = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const renderItem = (item: ItemType) => {
    return (
      <View style={styles.categoriesItem}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <Emoji symbol={item.code} />
      </View>
    );
  };

  const handleChange = (items: string[]) => {
    if (items.length > 5) {
      Alert.alert("Limit reached", "You can only select up to 5 items.");
      return;
    }
    setSelected(items);
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.input}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select categories"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={handleChange}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.tagsStyles}>
              <AntDesign color="black" name="close" size={17} />
              <Text>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <AddCategoryDialog />
    </View>
  );
};

export default CategoryMultiSelect;

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  input: {
    maxWidth: 300,
    width: "100%",
    alignSelf: "center",
  },
  icon: {
    marginRight: 5,
  },
  categoriesItem: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagsStyles: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
