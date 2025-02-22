import { Link, router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";
import Toast from "react-native-simple-toast";
import { changePassword } from "@/services/auth";

type NewPasswordData = {
  email: string;
  newPassword: string;
  token: string;
};

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { token, email } = useLocalSearchParams();

  const theme = useTheme();

  const containsSpaces = (str: string) => {
    return /\s/.test(str);
  };

  const handleLoginClick = async () => {
    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      return;
    }
    if (password !== password2) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const newPasswordData: NewPasswordData = {
      email: `${email}`,
      newPassword: password,
      token: `${token}`,
    };

    const isValid = await changePassword(newPasswordData);
    if (isValid == "valid") {
      router.push({
        pathname: "/Login",
        params: { token },
      });
    } else {
      setPasswordError(isValid);
    }

    Toast.show("Your password was changed successfully!", Toast.LONG);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    if (containsSpaces(password)) {
      setPasswordError("Password cannot contain spaces.");
      return false;
    }
    setPasswordError("");
    return true;
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
                You are almost there!
              </Text>
              <Text variant="bodySmall" style={styles.infoText}>
                Enter your new password and confirm it
              </Text>
            </View>
            <TextInput
              style={styles.input}
              label={<Text style={{color: theme.colors.onSurface}}>New password</Text>}
              value={password}
              secureTextEntry
              mode="outlined"
              onChangeText={(text) => setPassword(text)}
            />

            <TextInput
              style={styles.input}
              label={<Text style={{color: theme.colors.onSurface}}>Confirm new password</Text>}
              value={password2}
              secureTextEntry
              mode="outlined"
              onChangeText={(text) => setPassword2(text)}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <Text variant="bodySmall" style={styles.infoText}>
              Passwords must be at least 8 characters long and not contain spaces or special characters.
            </Text>
            <Button
              mode="contained"
              style={styles.btn}
              onPressOut={handleLoginClick}
            >
              Continue
            </Button>
          </Card.Content>
        </Card>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  infoText: {
    textAlign: "center"
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 5,
  },
  btn: {
    marginTop: 10,
  },
  input: {
    maxWidth: 320,
    width: "100%",
    alignSelf: "center",
    marginVertical: 5,
  },
  card: {
    width: 320,
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
