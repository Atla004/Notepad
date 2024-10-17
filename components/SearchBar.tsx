import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Avatar, Searchbar, useTheme } from "react-native-paper";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({
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
      right={() => (
        <>
          <Pressable
            style={styles.avatar}
            onPress={() => router.push({ pathname: `../Profile` })}
          >
            <Avatar.Text size={35} label="A" />
          </Pressable>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: 15,
  },
  searchBar: {
    marginTop: 10,
    width: "96%",
    alignSelf: "center",
    height: 50,
  },
});
