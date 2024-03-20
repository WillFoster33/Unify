import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../../backend/firebase';

export default function UserHomePage({ navigation }) {
  const user = firebase.auth().currentUser;

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
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user?.email}!</Text>
        <Text style={styles.text}>You are now logged in.</Text>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
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
});