import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Este es un pie de página de prueba</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#e7e7e7",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#333",
  },
});

export default Footer;
