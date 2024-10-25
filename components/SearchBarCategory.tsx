import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Avatar, Searchbar, useTheme } from "react-native-paper";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBarCategory({
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <Searchbar
      style={[
        styles.searchBar,
        { backgroundColor: theme.colors.primaryContainer },
      ]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      mode="view"
    />

  );
}

const styles = StyleSheet.create({
  searchBar: {
    maxHeight: 50,
    



  },
});
