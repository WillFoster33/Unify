// Import necessary dependencies
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the HomePage component
export default function HomePage({ navigation }) {
  return (
    // Use LinearGradient component to create a gradient background
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background} >
      {/* Use View component to create a container for the page content */}
      <View style={styles.container}>
        {/* Display the title text*/}
        <Text style={styles.title}>Welcome to Unify</Text>
        {/* Display the subtitle text*/}
        <Text style={styles.subtitle}>Secure student marketplace: {'\n'}Buy, sell, connect.</Text>
        {/* Use View component to create a container for the buttons */}
        <View style={styles.buttonContainer}>
          {/* Signup button */}
          <TouchableOpacity
            style={[styles.button]}
            // Navigate to the Signup page when the button is pressed
            onPress={() => navigation.navigate('Signup')}
          >
            {/* Display the sign up button text */}
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          {/* Login button */}
          <TouchableOpacity
            style={[styles.button]}
            // Navigate to the Login page when the button is pressed
            onPress={() => navigation.navigate('Login')}
          >
            {/* Display the log in button text */}
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

// Define the styles for the HomePage component
const styles = StyleSheet.create({
  // Style for the background gradient
  background: {
    flex: 1,
  },
  // Style for the container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Style for the title
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  // Style for the subtitle
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  // Style for the button container
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  // Style for the buttons
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 15,
    width: '100%',
  },
  // Style for the button text
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});