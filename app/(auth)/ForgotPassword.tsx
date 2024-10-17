import { Link, router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";

export default function ForgotPassword() {
  const [gmail, setGmail] = useState("");

  const theme = useTheme();

  const handleLoginClick = () => {
    console.log("User: ", gmail);
    router.push("/Home");
  };

  return (
    <Background>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.centeredText}>
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.primary }}
              >
                Forgot your Password?
              </Text>
              <Text variant="bodySmall">
                Enter your email address to recover your information
              </Text>
            </View>
            <TextInput
              style={styles.input}
              label="Email"
              value={gmail}
              mode="outlined"
              onChangeText={(text) => setGmail(text)}
            />

            <View style={[styles.row, styles.centeredRow]}>
              <Link href="./Login">
                <Text
                  variant="labelLarge"
                  style={{
                    color: theme.colors.primary,
                    textDecorationLine: "underline",
                  }}
                >
                  Go back to Log in
                </Text>
              </Link>
            </View>

            <Button mode="contained" onPressOut={handleLoginClick}>
              Continue
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
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
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
