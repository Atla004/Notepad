import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from 'expo-router';

function MyTabs() {
  return (

    <Tabs
    screenOptions={{
      headerShown: false,
    }}
    >
      
      <Tabs.Screen 
      name="Home" 
      options={{title: 'Home'}}
      
      />
      <Tabs.Screen 
      name="Categories" 
      options={{title: 'Categories'}}
      />
      <Tabs.Screen 
      name="Favorites" 
      options={{title: 'Favorites'}}
      />
    </Tabs>
  );
}

export default function App() {
  return (
    <>
      <MyTabs />
    </>
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