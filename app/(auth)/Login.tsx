import * as React from "react";

import { Link, router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(true);

  const theme = useTheme();

  const staySignedIn = () => {
    setChecked(!isChecked);
  };

  const handleLoginClick = () => {
    console.log("User: ", user);
    router.push("/Home");
  };

  return (
    <Background>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.centeredText}>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.primary }}
              >
                Welcome Back!
              </Text>
              <Text variant="bodyMedium">We're glad to have you back</Text>
            </View>
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
            <Link href="./ForgotPassword">
              <Text
                variant="labelMedium"
                style={{ color: theme.colors.primary }}
              >
                Forgot your Password?
              </Text>
            </Link>

            <View style={styles.signedIn}>
              <RadioButton
                value="ddd"
                status={isChecked ? "checked" : "unchecked"}
                onPress={staySignedIn}
              />
              <Text variant="labelLarge">Stay signed in </Text>
            </View>

            <View style={[styles.row, styles.centeredRow]}>
              <Text variant="labelLarge">Need an account? </Text>

              <Link href="./Register">
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.primary }}
                >
                  Register
                </Text>
              </Link>
            </View>

            <Button mode="contained" onPressOut={handleLoginClick}>
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    maxWidth: 220, // Set the maximum width to 300
    width: "100%", // Ensure the input takes up the full width of its container
    alignSelf: "center", // Center the input horizontally
    marginVertical: 5, // Add margin to the top and bottom of the input
  },
  card: {
    width: 250,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredText: {
    alignItems: "center",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  signedIn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: -10,
  },
  centeredRow: {
    justifyContent: "center", // Centrar horizontalmente
  },
});
