import * as React from "react";

import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Card, Text } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import { Button } from "react-native-paper";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(true);

  const staySignedIn = () => {
    setChecked(!isChecked);
  };

  const styles = StyleSheet.create({
    input: {
      maxWidth: 200, // Set the maximum width to 300
      width: "100%", // Ensure the input takes up the full width of its container
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      width: 250,
    }
  });

  return (
    <View style={styles.container}>
    <Card style = {styles.card}>
      <Card.Content>
        <Text variant="titleLarge">Welcome Back!</Text>
        <Text variant="labelLarge">We`re glad to have you back</Text>

        <TextInput
          style={styles.input}
          label="Email"
          value={user}
          mode="outlined"
          onChangeText={(text) => setUser(text)}
        />

        <TextInput
          style={styles.input}
          label="password"
          value={password}
          mode="outlined"
          onChangeText={(text) => setPassword(text)}
        />

        <Text variant="labelLarge">Forgot your Password?</Text>

        <RadioButton
          value="ddd"
          status={isChecked ? "checked" : "unchecked"}
          onPress={staySignedIn}
        />
        <Text variant="labelLarge">Stay signed in </Text>

        <Text variant="labelLarge">Need an account? </Text>

        <Link href="./Register">
          <Text variant="labelLarge">Register</Text>
        </Link>

        <Button mode="contained">Login</Button>
      </Card.Content>
    </Card>
    </View>
  );
}

