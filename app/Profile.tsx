import { router, Stack, useFocusEffect } from "expo-router";
import React, { useCallback, useContext, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Divider, Portal, Text, useTheme } from "react-native-paper";
import ProfileHeader from "@/components/ProfileHeader";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/components/Container";
import { logout } from "@/services/auth";
import { deleteUser, getUserEmail } from "@/services/user";
import Toast from "react-native-simple-toast";
import { getPasswordToken } from "@/services/auth";
import { fetchData, storeData,editJSONData } from "@/services/localstorage";


export default function Profile() {
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  const changeTheme = async () => {

try {
      console.log('toggle theme')
      const actualTheme = await fetchData('theme');
      console.log('toggle theme2')
      await storeData('theme', actualTheme == 'light' ? 'dark' : 'light')
      console.log('toggle theme3')
      toggleTheme();
} catch (error) {
  await storeData('theme', 'light')
  return
  
}
  }

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
    try {
      await deleteUser({ username });
      router.dismissAll();
      router.replace('/Login')
      console.log("Why");
    }
    catch (error) {
      console.error('Failed to delete user', error)
    }
  }

  const changePassword = async () => {

    await getPasswordToken(email);
    Toast.show(
      "We will send you a code to reset your password.",
      Toast.LONG
    );
    router.push({
      pathname: "/EnterCode",
      params: { email, isLogged: 'true' },
    });
    return;
  };

  const getUserData = async () => {
    const userName = await fetchData('username');
    const userEmail = await getUserEmail({username: userName});
    setUsername(userName);
    setEmail(userEmail);
  }

  useFocusEffect(
    useCallback(() => {
      const wrapper = async() => {
        await getUserData();
      }
      wrapper();
    }, [])
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
      color: 'red',
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
      <StatusBar/>
      <ProfileHeader />
      
      <Text variant="displaySmall" style={{ alignSelf: "center" }}>
        {username}
      </Text>
      <Text variant="labelLarge" style={{ alignSelf: "center" }}>
        {email}
      </Text>
      <Divider bold style={styles.divider} />
      <Text variant="bodySmall" style={styles.textCloseToDivider}>
        Profile Settings
      </Text>
  
      <Button icon="lock" textColor={theme.colors.shadow} style={styles.bnt}
        onPress={async () => {await changePassword()}}
      > 
        Change Password
      </Button>
      <Button
        icon="theme-light-dark"
        textColor={theme.colors.shadow}
        style={styles.bnt}
        onPress={changeTheme}
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
        onPress={() => router.push('/AboutUs')}
      >
        About us
      </Button>
      <Button
        icon="help-circle"
        textColor={theme.colors.shadow}
        style={styles.bnt}
        onPress={() => router.push('/F.A.Q')}
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
        textColor={theme.colors.onSurface}
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
              onPress={ async () => deleteAccount() }
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
