import * as React from "react";

import { StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <PaperProvider>
        <Stack 
        screenOptions={
          {headerShown: false}
        }
        />
    </PaperProvider>
  );
}

