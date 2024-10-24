import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Divider, Portal, Text, useTheme } from "react-native-paper";
import ProfileHeader from "@/components/ProfileHeader";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/components/Container";
import { logout } from "@/services/auth";
import { deleteUser, getUserEmail } from "@/services/user";
import { fetchData } from "@/services/localstorage";

export default function Profile() {
  const { toggleTheme } = useContext(ThemeContext);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [visibleDialog, setVisible] = useState<boolean>(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const LogOut = async () => {
    await logout();
    router.dismissAll();
    router.replace("/Login");
  };

  const deleteAccount = async () => {
    await deleteUser({ username });
    await logout();
  }

  const theme = useTheme();

  const getUserData = async () => {
    const userName = await fetchData('username');
    const userEmail = await getUserEmail({username});
    setUsername(userName);
    setEmail(userEmail);
  }

  useFocusEffect(
    useCallback(() => {
      getUserData();
    },[])
  )

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
      backgroundColor: theme.colors.shadow,
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
    dialogTitle: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
      color: "red",
    },
    dialogContent: {
      textAlign: "center",
      fontSize: 16,
    },
    dialogButton: {
      marginHorizontal: 10,
    },
    deleteButton: {
      borderRadius: 8,
    },
  });


  return (
    <View
      style={[{ backgroundColor: theme.colors.surface }, { height: "100%" }]}
    >
      <StatusBar />
      <ProfileHeader />

      <Text variant="displaySmall" style={{ marginHorizontal: 10 }}>
        {username}
      </Text>
      <Text variant="labelLarge" style={{ marginHorizontal: 10 }}>
        {email}
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
        onPress={toggleTheme}
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
        onPress={showDialog}
      >
        Delete account
      </Button>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title style={styles.dialogTitle}>
            Confirm
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.dialogContent}>
              Are you sure you want to delete your account?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} style={styles.dialogButton}>
              Cancel
            </Button>
            <Button
              onPress={ async () => await deleteAccount() }
              style={[
                styles.dialogButton,
                styles.deleteButton,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
    
  );
}
