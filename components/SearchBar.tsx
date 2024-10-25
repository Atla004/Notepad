import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Avatar, Searchbar, useTheme } from "react-native-paper";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const lightTheme = {
  colors: { 
    primary: "#F7F7ED", // naranja
    surface: "#EBEBD3", // Beige
    primaryContainer: "#F7F7ED", //white
    tertiary: "#532302", //marron
    shadow: "#3C3C3B", // gris
    scrim: "#FDCDAC", //naranja claro
  },
};

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
            <Avatar.Icon size={35} icon="account" theme={{colors: { primary: "#F7F7ED"}}} color="#3C3C3B" />
          </Pressable>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: 15,
    // backgroundColor: "#FFF"
  },
  searchBar: {
    marginTop: 10,
    width: "96%",
    alignSelf: "center",
    height: 50,
  },
  pressable: {
    marginLeft: 15
  }
});
