import { Stack } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useTheme } from "react-native-paper";



export default function AboutUs() {
  const theme = useTheme();
  const markdownContent = `
# F.A.Q. - Note-Taking App

## General

### What is a note-taking app?
A note-taking app is a digital tool that allows users to create, organize, and manage notes efficiently. This app offers features like user registration, login, logout, and profile deletion, ensuring that user data is unique and accessible only after logging in.

### What are the benefits of using this note-taking app?
Using this note-taking app offers several benefits, including:
- **Organization**: Keep all your notes in one place.
- **Accessibility**: Access your notes from any device with an internet connection.
- **Privacy**: Your notes are unique to you and can only be viewed after logging in.
- **Customization**: Organize your notes into categories and prioritize them as needed.

## Features

### Can I register, log in, log out, and delete my profile?
Yes, our app allows you to register a new account, log in to your account, log out, and delete your profile if you no longer wish to use the service.

### Can I create notes with a title and description?
Yes, you can create notes with a title and a description. The description has a limit of 250 characters.

### Can I add notes to "favorites"?
Yes, you can add notes to your "favorites" list for quick access to important notes.

### Can I assign a priority or weight to my notes?
Yes, you can assign a priority or weight to your notes to help you organize and prioritize your tasks and information.

### Can I create and manage categories for my notes?
Yes, you can create and manage categories to group your notes according to your preferences. This helps in organizing and finding specific notes easily.

## Usage

### How do I create a new note?
To create a new note, simply open the app, look for the "New Note" or "+" button, and start typing your note. Remember that the description has a limit of 250 characters.

### How do I add a note to "favorites"?
To add a note to your "favorites" list, open the note you want to favorite, look for the "Favorite" button or icon, and click on it.

### How do I assign a priority or weight to a note?
To assign a priority or weight to a note, open the note, look for the priority or weight setting, and select the desired level.

### How do I create and manage categories?
To create a new category, look for the "Categories" section in the app, click on "+" button and enter the category name. You can then assign notes to this category by selecting the category when creating or editing a note.

## Troubleshooting

### What should I do if I can't log in to my account?
If you can't log in to your account, try the following steps:
1. Check your internet connection.
2. Ensure you are entering the correct username and password.
3. Use the "Forgot Password" feature to reset your password.
4. Contact customer support if the issue persists.

### What should I do if my notes are not syncing?
If your notes are not syncing, try the following steps:
1. Check your internet connection.
2. Ensure you are logged into your account.
3. Restart the app or your device.
4. Check for any app updates.
5. Contact customer support if the issue persists.

## Support

### How can I contact customer support?
You can contact customer support through the following channels:
- **Email**: [support@tlas.online](mailto:support@tlas.online)
- **Address**:El Milagro URU, Maracaibo, 4001, Venezuela


Thank you for using our note-taking app! If you have any other questions, please don't hesitate to reach out to our support team.

`;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 50,
      backgroundColor: theme.colors.surface, // Fondo negro para contraste
    },
    scrollView: {
      flexGrow: 1,
    },
    markdown: {
      body: {
        color: theme.colors.shadow, 
      },
      heading1: {
        color: theme.colors.shadow, 
      },
    
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `About Us `,
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primaryContainer, // Cambia este valor al color que desees
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Markdown style={styles.markdown}>{markdownContent}</Markdown>
      </ScrollView>
    </View>
  );
}

