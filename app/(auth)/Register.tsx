import { useCallback, useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, TextInput, Button, useTheme } from "react-native-paper";
import { Link, router, useFocusEffect } from "expo-router";
import Background from "@/components/Background";
import Toast from "react-native-simple-toast";
import { register } from "@/services/auth";

export default function Register() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", user: "", password: "" });

  useFocusEffect(
    useCallback(() => {
      setErrors({ email: "", user: "", password: "" });
      setEmail("");
      setUser("");
      setPassword("");
    }, [])
  );

  const handleRegisterClick = async () => {
    try {
      const emailError = validateEmail(email);
      const userError = validateUser(user);
      const passwordError = validatePassword(password);

      const newErrors = {
        email: emailError,
        user: userError,
        password: passwordError,
      };
      setErrors(newErrors);

      let valid = !emailError && !userError && !passwordError;

      const containsSpaces = (str: string) => {
        return /\s/.test(str);
      };

      if (containsSpaces(user)) {
        setErrors({ ...newErrors, user: "Username cannot contain spaces." });
        valid = false;
      }

      if (containsSpaces(password)) {
        setErrors({
          ...newErrors,
          password: "Password cannot contain spaces.",
        });
        valid = false;
      }

      if (containsSpaces(email)) {
        setErrors({ ...newErrors, email: "Email cannot contain spaces." });
        valid = false;
      }

      if (!valid) {
        return;
      }

      const response = await register({ email, username: user, password });

      if (response == "registered") {
        Toast.show("Registrado con éxito", Toast.LONG);
        router.push("/Login");
        return;
      } else {
        if (response === "Email already in use") {
          setErrors({
            email: "Email already in use",
            user: "",
            password: "",
          });
        } else if (response === "Username already in use") {
          setErrors({
            email: "",
            user: "Username already in use",
            password: "",
          });
          return;
        }
      }
    } catch (error) {
      setErrors({
        email: "",
        user: "hola",
        password: (error as Error).message,
      });
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!re.test(email)) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const validateUser = (user: string) => {
    if (user.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  return (
    <Background>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.centeredText}>
              <Text
                variant="headlineMedium"
                style={{ color: theme.colors.primary }}
              >
                Register
              </Text>
              <Text variant="bodyMedium"> Enter your personal details</Text>
            </View>

            <TextInput
              style={[styles.input, { marginTop: -10 }]}
              label="Email"
              value={email}
              mode="outlined"
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email ? (
              <Text variant="labelSmall" style={styles.errorText}>
                {errors.email}
              </Text>
            ) : null}

            <TextInput
              style={styles.input}
              label="Username"
              value={user}
              mode="outlined"
              onChangeText={(text) => setUser(text)}
            />
            {errors.user ? (
              <Text variant="labelSmall" style={styles.errorText}>
                {errors.user}
              </Text>
            ) : null}

            <TextInput
              style={styles.input}
              label="Password"
              value={password}
              mode="outlined"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            {errors.password ? (
              <Text variant="labelSmall" style={styles.errorText}>
                {errors.password}
              </Text>
            ) : null}

            <View style={[styles.row, styles.centeredRow]}>
              <Text variant="labelLarge">Already have an account? </Text>
              <Link href="./Login">
                <Text
                  variant="labelLarge"
                  style={{ color: theme.colors.primary }}
                >
                  Log in
                </Text>
              </Link>
            </View>

            <Button
              mode="contained"
              onPress={handleRegisterClick}
              style={styles.button}
            >
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 250,
  },
  input: {
    maxWidth: 220,
    width: "100%",
    alignSelf: "center",
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  centeredRow: {
    justifyContent: "center", // Centrar horizontalmente
  },
  centeredText: {
    alignItems: "center",
    marginBottom: 15,
  },
});
