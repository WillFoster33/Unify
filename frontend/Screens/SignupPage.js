import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../../backend/firebase';
import firebase from '../../backend/firebase';

export default function SignupPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignup = () => {
    if (!email.endsWith('@wisc.edu')) {
      Alert.alert('Error', 'Please use a valid @wisc.edu email address');
      return;
    }

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

        user.sendEmailVerification()
          .then(() => {
            if (firebase.auth().currentUser) {
              navigation.navigate('Verification');
            } else {
              Alert.alert('Error', 'Failed to sign in after sending verification email, please try again.');
            }
          })
          .catch((error) => {
            Alert.alert('Error', 'Failed to send verification email, please try again.');
          });
      })
      .catch((error) => {
        Alert.alert('Invalid Sign Up', 'The email address you entered is already associated with an account. Please use a different email address or log in to your existing account.');
      });
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] }]}>
        <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
          <Text style={styles.title}>Sign Up</Text>
        </Animated.View>
        <TextInput
          style={styles.input}
          placeholder="Email (@wisc.edu)"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Already have an account? Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.linkText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    width: '100%',
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
    paddingHorizontal: 30,
    paddingVertical: 18,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});