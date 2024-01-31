import React, { useState } from 'react';
import { View,Text, TextInput, Button,ImageBackground, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Implement sign up logic here
    // Example: Call registration API
    if (!username || !email || !password) {
      Alert.alert('Error', 'please enter both username and password');
    }

    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('username', password);

      navigation.navigate('SignIn');
    } catch(error) {
      console.error('Error saving data: ', error);
      Alert.alert('Error', 'An error occurred while signing up');
    }
  };

  return (
    <ImageBackground
      source={require('./assets/signup.png')} // Ganti dengan path gambar Anda
      style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
      onPress={handleSignUp}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>Sign Up</Text>
    </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
        Already have an account? Sign In
      </Text>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // atau 'stretch' untuk merentangkan gambar sesuai dimensi layar
    justifyContent: 'center',
    width: 390,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#71C490',
    marginTop: 100,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#71C490',
    borderWidth: 1,
    marginTop:15,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    marginTop: 16,
  },
  buttonContainer: {
    backgroundColor: '#71C490',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
