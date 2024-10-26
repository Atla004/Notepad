import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Avatar, useTheme } from "react-native-paper";

const ProfileHeader = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    headerText: {
      alignSelf: "center",
      marginTop: -22,
      color: theme.colors.onSurface 

    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "flex-end", // Alinea los elementos al final del contenedor
      height: 90, // Ajusta este valor según tus necesidades
      backgroundColor: "#F7F7ED", // Color del encabezado
      paddingBottom: 10, // Ajusta este valor para mover el contenido hacia abajo
    },
    headerLeft: {
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
    },
    profileLetterContainer: {
      width: 80,
      height: 80,
      borderRadius: 100,
      backgroundColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 40,
    },
    profileLetter: {
      fontSize: 20,
      color: "#fff",
    },
    headerBackground: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    headerBackgroundImage: {
      width: "100%",
      height: "100%",
    },
    backButton: {
      marginLeft: 25,
      marginTop: 40,
      color: theme.colors.onSurface 
    }
  });
  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <View style={styles.headerLeft}>
        {/* <View style={styles.profileLetterContainer}>
          <Avatar.Text size={70} label="A" />
        </View> */}
      </View>
      <View style={styles.headerBackground}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={theme.colors.onSurface} />
        </Pressable>
        {/* <Image
          style={styles.headerBackgroundImage}
          source={{ uri: "URL_DE_TU_IMAGEN" }}
        /> */}
        <Text style={styles.headerText}>Profile</Text>
      </View>
    </View>
  );
  {
    /* <Image
source={{ uri: 'URL_DE_LA_FOTO_DE_PERFIL' }} // Reemplaza con la URL de la foto de perfil
style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
/> */
  }
};


export default ProfileHeader;
