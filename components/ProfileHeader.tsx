import React from "react";
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Avatar } from "react-native-paper";

const ProfileHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.profileLetterContainer}>
          <Avatar.Text size={70} label="A" />
        </View>
      </View>
      <View style={styles.headerBackground}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.push("./Home")}
      >
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </Pressable>
        <Image 
          style={styles.headerBackgroundImage}
          source={{ uri: "URL_DE_TU_IMAGEN" }}
        />
      </View>
    </View>
  );
};
{
  /* <Image
source={{ uri: 'URL_DE_LA_FOTO_DE_PERFIL' }} // Reemplaza con la URL de la foto de perfil
style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 10 }}
/> */
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "flex-end", // Alinea los elementos al final del contenedor
    height: 150, // Ajusta este valor según tus necesidades
    backgroundColor: "rgb(177, 230, 156)", // Color del encabezado
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
    marginLeft:25,       
    marginTop: 40, 
  },
});

export default ProfileHeader;
