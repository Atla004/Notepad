import { Link, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";
import { checkResetToken } from "@/services/auth";

export default function ForgotPassword() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const { email } = useLocalSearchParams();

  const theme = useTheme();

  const handleLoginClick = async () => {
    const isValid = await checkResetToken(token);
    if (isValid == "valid") {
      router.push({
        pathname: '/ChangePassword',
        params: { token,email }
      });
    } else {
      setError("Invalid token");
    }
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
                Enter your Code
              </Text>
              <Text variant="bodySmall">
                Enter the code that was sent to your email address
              </Text>
            </View>
            <TextInput
              style={styles.input}
              label="code"
              value={token}
              mode="outlined"
              onChangeText={(text) => setToken(text)}
            />
            {error ? (
              <Text variant="labelSmall" style={styles.errorText}>
                {error}
              </Text>
            ) : null}

            <View style={[styles.row, styles.centeredRow]}>
              <Link href="./ForgotPassword">
                <Text
                  variant="labelLarge"
                  style={{
                    color: theme.colors.primary,
                    textDecorationLine: "underline",
                  }}
                >
                  not received the code?
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
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  input: {
    maxWidth: 220,
    width: "100%",
    alignSelf: "center",
    marginVertical: 5,
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
