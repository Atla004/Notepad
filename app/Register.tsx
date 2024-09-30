import { useState } from 'react';
import { Card, Text } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';
import { Link } from 'expo-router';


//fix the extends issee
const RegisterCard = () =>{
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

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
        <Text variant="titleLarge">Register</Text>

        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          mode='outlined'
          onChangeText={text => setEmail(text)}
        />
        
        <TextInput
          style={styles.input}
          label="Username"
          value={user}
          mode='outlined'
          onChangeText={text => setUser(text)}
        />

        <TextInput
          style={styles.input}
          label="password"
          value={password}
          mode='outlined'
          onChangeText={text => setPassword(text)}
        />

        <Text variant="labelSmall">The password must be at least 8 characters </Text>



        
        <Text variant="labelLarge">Already have an account? </Text>
        <Link href="./Login">
        <Text variant="labelLarge"> log in</Text>
        </Link>

        <Button mode="contained">Register</Button>

      </Card.Content>
    
    </Card>
    </View>
  );
}

export default RegisterCard;