// Import necessary dependencies
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the HomePage component
export default function HomePage({ navigation }) {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Unify</Text>
        <Text style={styles.subtitle}>Secure student marketplace: {'\n'}Buy, sell, connect.</Text>
        <View style={styles.buttonContainer}>
          {/* Signup button */}
          <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          {/* Login button */}
          <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 15,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});