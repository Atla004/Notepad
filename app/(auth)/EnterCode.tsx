import { Link, router, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { Card, Text, useTheme, Button, TextInput } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import Background from "@/components/Background";
import { checkResetToken } from "@/services/auth";

export default function ForgotPassword() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const { email, isLogged=false } = useLocalSearchParams();

  const theme = useTheme();

  const router = useRouter();
  const handleGoBack = () => {
    router.dismiss(1);
  }

  const handleCodeChange = (text: string) => {
    setToken(text.toUpperCase());
  }

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
                Check your inbox
              </Text>
              <Text variant="bodySmall" style={styles.infoText}>
                Enter the code that was sent to your email address, if you can't find it try looking in your spam folder
              </Text>
            </View>
            <TextInput
              style={styles.input}
              label={<Text style={{color: theme.colors.onSurface}}>Code</Text>}
              value={token}
              mode="outlined"
              onChangeText={(text) => handleCodeChange(text)}
            />
            {error ? (
              <Text variant="labelSmall" style={styles.errorText}>
                {error}
              </Text>
            ) : null}

            {!isLogged ?
              <View style={[styles.row, styles.centeredRow]}>
                <Link href="./ForgotPassword">
                  <Text
                    variant="labelLarge"
                    style={{
                      color: theme.colors.primary,
                      textDecorationLine: "underline",
                    }}
                    >
                    Not received the code?
                  </Text>
                </Link>
              </View> : <>
              <Button mode="contained" onPressOut={handleGoBack}>
                Cancel
              </Button>
            </>
            }

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
  infoText: {
    textAlign: "center"
  },
  errorText: {
    color: "red",
    marginBottom: 8,
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
