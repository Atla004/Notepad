import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Slot, Stack } from 'expo-router';
import Register from './Register';
import Login from './Login';

export default function Layout() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Slot/>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
