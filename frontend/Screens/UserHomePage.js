// Import necessary dependencies
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../../backend/firebase';

// Define the UserHomePage component
export default function UserHomePage({ navigation }) {
  // Get the currently logged-in user
  const user = firebase.auth().currentUser;

  // Function to handle user sign out
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Navigate to the homepage after sign out
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  return (
    // Use a linear gradient background for the user home page
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      {/* Container for the user home page content */}
      <View style={styles.container}>
        {/* Display the welcome message with the user's email */}
        <Text style={styles.title}>Welcome, {user?.email}!</Text>
        {/* Display a message indicating the user is logged in */}
        <Text style={styles.text}>You are now logged in.</Text>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// Styles for the UserHomePage component
const styles = StyleSheet.create({
  // Style for the background
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Style for the text
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  // Style for the sign out button
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginTop: 20,
    width: '100%',
  },
  // Style for the sign out button text
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});