import { NoteContext } from "@/app/NoteContext";
import { fetchData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { Note } from "@/types/apiResponses";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Decoupled", value: "5" },
  { label: "Very Important", value: "4" },
  { label: "Fairly important", value: "3" },
  { label: "Important", value: "2" },
  { label: "Slightly Important", value: "1" },
  { label: "Not Important", value: "0" },
];

const DropdownPriority = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const { noteData, setNoteData } = useContext(NoteContext);

  useEffect(() => {
    console.log("Priority", value);
    guardarPrioridad();
  }, [value]);

  const guardarPrioridad = async () => {
    console.log("Priority", value);
    setNoteData({ ...noteData, priority: Number(value) });

    const dataToSave = {
      ...(noteData as Note),
      priority: Number(value),
    };

    console.log("DataToSave dropdown", dataToSave);
    const username = await fetchData("username");
    await editNote(username, dataToSave);
    console.log("Priority", value);
    console.log("NoteData", noteData);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownPriority;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
});
