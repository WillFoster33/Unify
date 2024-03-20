// Import necessary dependencies
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../backend/firebase';
import firebase from '../../backend/firebase';

// Define the SignupPage component
export default function SignupPage({ navigation }) {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle signup
  const handleSignup = () => {
    // Email validation
    if (!email.endsWith('@wisc.edu')) {
      Alert.alert('Error', 'Please use a valid @wisc.edu email address');
      return;
    }

   // Password validation
   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;
    if (!passwordRegex.test(password)) {
    Alert.alert('Invalid Password', 'Password must be at least 8 characters long, include a number, have at least one uppercase and one lowercase letter, and contain no spaces');
    return;
  }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registered with: ', user.email);
        navigation.navigate('Verification');
      })
      .catch((error) => Alert.alert('Invalid Sign Up', 'User already exists. Please log in.'));
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        {/* Email input field */}
        <TextInput
          style={styles.input}
          placeholder="Email (@wisc.edu)"
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
        {/* Signup button */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {/* Login link */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Log In</Text>
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