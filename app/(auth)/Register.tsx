import { useCallback, useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, TextInput, Button, useTheme } from "react-native-paper";
import { Link, router, useFocusEffect } from "expo-router";
import Background from "@/components/Background";
import Toast from "react-native-toast-message";

export default function Register() {
  const theme = useTheme(); // Obtener el tema actual
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", user: "", password: "" });

  useFocusEffect(
    useCallback(() => {
      // Limpiar los errores cuando la pantalla se enfoque
      setErrors({ email: "", user: "", password: "" });
      setEmail("");
      setUser("");
      setPassword("");
    }, [])
  );
  const handleRegisterClick = () => {
    let valid = true;
    let newErrors = { email: "", user: "", password: "" };

    /*     if (!email.includes("@")) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (user.length < 3) {
      newErrors.user = "Username must be at least 3 characters";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    } */

    setErrors(newErrors);

    if (valid) {
      // Lógica de registro aquí
      console.log("Registrado con éxito");
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "Te has registrado con éxito 👋",
      });
      router.push("/Login");
    }
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
    width: 300,
    padding: 16,
  },
  input: {
    marginBottom: 8,
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
