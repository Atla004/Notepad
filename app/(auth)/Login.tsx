import { Link, router, useFocusEffect } from "expo-router";
import { StyleSheet, View, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";
import { autologin, login } from "@/services/auth";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(true);
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const theme = useTheme();

  const staySignedIn = () => {
    setChecked(!isChecked);
  };

  const goToLogin = async () => {
    console.log("goToLogin");
    const logger = await autologin();
    if (logger) {
      router.replace("/Home");
    }
  };

  const handleLoginClick = async () => {
    try {
      const isUserValid = validateUser(user);
      const isPasswordValid = validatePassword(password);
      let spacesUser = true;
      let spacesPassword = true;

      if (containsSpaces(user)) {
        setUserError("Username cannot contain spaces.");
        spacesUser = false;
      }
      if (containsSpaces(password)) {
        setPasswordError("Password cannot contain spaces.");
        spacesPassword = false;
      }

      if (!isUserValid || !isPasswordValid || !spacesUser || !spacesPassword) {
        return;
      }

      const userData = { username: user, password: password };
      const awaitedUser = await login(userData, isChecked);

      if (awaitedUser) {
        console.log("User: ", userData);
        router.push("/Home");
        return;
      } else {
        throw new Error("Invalid username or password.");
      }
    } catch (error) {
      setPasswordError((error as Error).message);
    }
  };

  const validateUser = (email: string) => {
    if (user.length < 3) {
      setUserError("Username must be at least 3 characters.");
      return false;
    }

    setUserError("");
    return true;
  };

  const containsSpaces = (str: string) => {
    return /\s/.test(str);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      goToLogin();

      return () => {
        console.log("unmounting");
        setPassword("");
        setUserError("");
        setPasswordError("");
  
      };
    }, [])
  );

  return (
    <Background
      theme={theme.dark ? 'dark' : 'light'}
    >
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
              <Text 
              variant="bodyMedium"
              style={{ color: theme.colors.onSurface }}
              >We're glad to have you back</Text>
            </View>
            <TextInput
              style={styles.input}
              label={<Text style={{color: theme.colors.onSurface}}>Username</Text>}
              value={user}
              mode="outlined"
              error={!!userError}
              onChangeText={(text) => setUser(text)}
            />
            {userError ? (
              <Text style={styles.errorText}>{userError}</Text>
            ) : null}

            <TextInput
              style={styles.input}
              label={<Text style={{color: theme.colors.onSurface}}>Passowrd</Text>}
              value={password}
              mode="outlined"
              secureTextEntry
              error={!!passwordError}
              onChangeText={(text) => setPassword(text)}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

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
              <Text 
                variant="labelLarge"
                style={{ color: theme.colors.onSurface }}
              >Stay signed in </Text>
            </View>

            <View style={[styles.row, styles.centeredRow]}>
              <Text
                variant="labelLarge"
                style={{ color: theme.colors.onSurface }}
               >Need an account? </Text>

              <Link href="./Register">
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.primary }}
                >
                  Register
                </Text>
              </Link>
            </View>

            <Button mode="contained" onPress={handleLoginClick}>
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
    justifyContent: "center",
  },
  errorText: {
    color: "red",
    alignSelf: "center",
    marginBottom: 5,
  },
});
