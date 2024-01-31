// SignInScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      // Mengambil data pengguna dari AsyncStorage
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      // Validasi username dan password 
      if (username === storedUsername && password === storedPassword) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error retrieving data: ', error);
      Alert.alert('Error', 'An error occurred while signing in');
    }
   };

  return (
    <ImageBackground
      source={require('./assets/signin.png')} // Ganti dengan path gambar Anda
      style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
      onPress={handleSignIn}
      style={styles.buttonContainer}
    >
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
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

export default SignInScreen;
