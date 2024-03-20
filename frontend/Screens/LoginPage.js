// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../../backend/firebase';
import { useNavigation } from '@react-navigation/native';

// Define the LoginPage component
export default function LoginPage({ navigation }) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('UserHome');
      }
    })
    return unsubscribe;
  }, []);
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
  
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log('Logged in with:', user.email);
          // Navigate to the user home page or desired screen
          navigation.navigate('UserHome');
        } 
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          Alert.alert('Error', 'Incorrect email or password.');
        } else if (error.code === 'auth/too-many-requests') {
          Alert.alert('Error', 'Too many failed log in attempts. Please reset your password or try again later.');
        }
        else {
          Alert.alert('Error', error.message);
        }
      });
  };
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Log In</Text>
        {/* Email input field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={email}
          onChangeText={setEmail}
        />
        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={password}
          onChangeText={setPassword}
        />
        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        {/* Signup link */}
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        {/* Back to Home link */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.linkText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: 'white',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});