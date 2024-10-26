
import { fetchData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

const data = [
  { label: "Top Priority", value: "5" },
  { label: "Very Important", value: "4" },
  { label: "Fairly important", value: "3" },
  { label: "Important", value: "2" },
  { label: "Slightly Important", value: "1" },
  { label: "Not Important", value: "0" },
];

interface DropdownPriorityProps {
  priority: string;
  _id: string;
}

const DropdownPriority = ({priority,_id}: DropdownPriorityProps) => {
  const [notePriority, setNotePriority] = useState<string | null>(priority);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    updateNotePriority();
  }, [notePriority]);

  const updateNotePriority = async () => {
    console.log("Priority", priority);
    console.log("NotePriority", notePriority);

    const dataToSave = {
      priority: Number(notePriority),
    };
    const username =await fetchData("username");
    editNote(username,{_id, ...dataToSave});
    console.log ("Priority object", dataToSave);
  };

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
    },
    dropdown: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 8,
      padding: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
      height: 50,
      borderColor: theme.colors.shadow,
      borderWidth: 1,
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
      color: theme.colors.onSurface
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    selectContainer: {
      borderRadius: 8,
      borderColor: theme.colors.shadow,
      borderWidth: 1,
      backgroundColor: theme.colors.primaryContainer
    },
    itemText: {
      color: theme.colors.onSurface
    }
  });  

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.selectContainer}
        itemTextStyle={styles.itemText}
        activeColor={theme.colors.scrim}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={priority}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={async (item) => {
          setNotePriority(item.value);
          setIsFocus(false);
          await updateNotePriority();

        }}
      />
    </View>
  );
};

export default DropdownPriority;

