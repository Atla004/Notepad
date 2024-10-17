import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Button, Divider, Text, useTheme } from "react-native-paper";
import ProfileHeader from "@/components/ProfileHeader";
import { PeopleIcon, PersonIcon } from "@/components/Icon";

export default function Profile() {
  const LogOut = () => {
    console.log("Log out");
    router.push("/Login");
  };
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState("");

  const styles = StyleSheet.create({
    bnt: {
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 8,
      color: "black",
    },
    divider: {
      marginVertical: 16, // Adjust the value to increase or decrease the space
      marginHorizontal: 10,
    },
    textCloseToDivider: {
      marginTop: -8,
      marginLeft: 16,
    },
    deleteBnt: {
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
    },
  });

  return (
    <View
      style={[{ backgroundColor: theme.colors.surface }, { height: "100%" }]}
    >
      <ProfileHeader />

      <Text variant="displaySmall" style={{ marginHorizontal: 10 }}>
        Atlassss
      </Text>
      <Text variant="labelLarge" style={{ marginHorizontal: 10 }}>
        avecespienso@yahoo.com
      </Text>
      <Divider bold style={styles.divider} />
      <Text variant="bodySmall" style={styles.textCloseToDivider}>
        Profile data
      </Text>
      <Button icon="account" textColor={theme.colors.shadow} style={styles.bnt}>
        Change Email
      </Button>
      <Button icon="lock" textColor={theme.colors.shadow} style={styles.bnt}>
        Change Password
      </Button>
      <Divider bold style={styles.divider} />
      <Text variant="bodySmall" style={styles.textCloseToDivider}>
        Settings
      </Text>
      <Button
        icon="theme-light-dark"
        textColor={theme.colors.shadow}
        style={styles.bnt}
      >
        Change Theme
      </Button>
      <Divider bold style={styles.divider} />
      <Text variant="bodySmall" style={styles.textCloseToDivider}>
        information
      </Text>
      <Button
        icon="information"
        textColor={theme.colors.shadow}
        style={styles.bnt}
      >
        About us
      </Button>
      <Button
        icon="help-circle"
        textColor={theme.colors.shadow}
        style={styles.bnt}
      >
        F.A.Q
      </Button>
      <Divider bold style={styles.divider} />
      <Text variant="bodySmall" style={styles.textCloseToDivider}>
        Session
      </Text>
      <Button
        icon="logout"
        textColor={theme.colors.shadow}
        style={styles.bnt}
        onPress={LogOut}
      >
        Log out
      </Button>
      <Button
        icon="delete"
        textColor={theme.colors.primaryContainer}
        style={styles.deleteBnt}
      >
        Delete account
      </Button>
    </View>
  );
}
