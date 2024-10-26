import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";

export const FilledFavoritesIcon = () => {
  const theme = useTheme();
  return <Entypo name="star" size={24} color={theme.colors.onSurface} />
}

export const FavoritesIcon = () => {
  const theme = useTheme();
  return <Entypo name="star-outlined" size={24} color={theme.colors.onSurface} />;
};

export const SunIcon = () => {
  const theme = useTheme();
  return <Feather name="sun" size={24} color={theme.colors.onSurface} />;
};

export const SettingsIcon = () => {
  const theme = useTheme();
  return <Feather name="settings" size={21} color={theme.colors.onSurface} />;
};

export const TrashIcon = () => {
  const theme = useTheme();
  return <Feather name="trash-2" size={24} color={theme.colors.onSurface} />;
};

export const FolderIcon = () => {
  const theme = useTheme();
  return <FontAwesome6 name="folder" size={20} color={theme.colors.onSurface} />;
};

export const BoxIcon = () => {
  const theme = useTheme();
  return <Feather name="inbox" size={24} color={theme.colors.onSurface} />;
};

export const PlusIcon = () => {
  const theme = useTheme();
  <AntDesign name="plus" size={24} color={theme.colors.onSurface} />;
};

export const PeopleIcon = () => {
  const theme = useTheme();
  <Ionicons name="people-sharp" size={24} color={theme.colors.onSurface} />;
};

export const PersonIcon = () => {
  const theme = useTheme();
  <Ionicons name="person-sharp" size={24} color={theme.colors.onSurface} />;
};

export const CloseIcon = () => {
  const theme = useTheme();
  <AntDesign name="close" size={24} color={theme.colors.onSurface} />;
};
