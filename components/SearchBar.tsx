import { router } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { Avatar, Searchbar } from "react-native-paper";

interface SearchBarProps {
  placeholder: string;
}

export default function SearchBar({placeholder}: SearchBarProps) {


  
  const [searchQuery, setSearchQuery] = useState("");
  return(
  <Searchbar
    placeholder={placeholder}
    onChangeText={setSearchQuery}
    value={searchQuery}
    right={(props) => (
      <>
        <Pressable
          onPress={() => router.push({pathname: `../Profile`})}
        >
          <Avatar.Text size={35} label="A" />
        </Pressable>
      </>
    )}
  />
)
}

  



