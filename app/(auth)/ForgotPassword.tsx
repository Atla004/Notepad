import { Link, router, useFocusEffect } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";
import { getPasswordToken } from "@/services/auth";
import Toast from "react-native-simple-toast";

export default function ForgotPassword() {
  const [gmail, setGmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const theme = useTheme();

  const handleLoginClick = async () => {
    const isEmailValid = validateEmail(gmail);

    if (!isEmailValid) {
      return;
    }
    await getPasswordToken(gmail);
    Toast.show(
      "If your email matches an existing account we will send you a code to reset your password.",
      Toast.LONG
    );
    router.push("/EnterCode");
    return;
  };

  const validateEmail = (email: string) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!re.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmailError("");
        setGmail("");
      };
    }, [])
  );

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
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

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
  errorText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 5,
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
