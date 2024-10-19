import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export const FilledFavoritesIcon = () => {
  return <Entypo name="star" size={24} color="black" />
}

export const FavoritesIcon = () => {
  return <Entypo name="star-outlined" size={24} color="black" />;
};

export const SunIcon = () => {
  return <Feather name="sun" size={24} color="black" />;
};

export const SettingsIcon = () => {
  return <Feather name="settings" size={21} color="black" />;
};

export const TrashIcon = () => {
  return <Feather name="trash-2" size={24} color="black" />;
};

export const FolderIcon = () => {
  return <FontAwesome6 name="folder" size={20} color="black" />;
};

export const BoxIcon = () => {
  return <Feather name="inbox" size={24} color="black" />;
};

export const PlusIcon = () => {
  <AntDesign name="plus" size={24} color="black" />;
};

export const PeopleIcon = () => {
  <Ionicons name="people-sharp" size={24} color="black" />;
};

export const PersonIcon = () => {
  <Ionicons name="person-sharp" size={24} color="black" />;
};

export const CloseIcon = () => {
  <AntDesign name="close" size={24} color="black" />;
};
