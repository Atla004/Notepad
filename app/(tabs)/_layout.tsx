import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Tabs } from "expo-router";
import { BoxIcon, FolderIcon, FavoritesIcon } from "@/components/Icon";
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context';


function MyTabs() {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
    }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Notes",
          tabBarIcon: () => <BoxIcon />,
        }}
        />
      <Tabs.Screen
        name="Categories"
        options={{
          title: "Categories",
          tabBarIcon: () => <FolderIcon />,
        }}
      />
      <Tabs.Screen
        name="Favorites"
        options={{
          title: "Favorites",
          tabBarIcon: () => <FavoritesIcon />,
        }}
        />
    </Tabs>
  );
}

export default function App() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
      <MyTabs />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
