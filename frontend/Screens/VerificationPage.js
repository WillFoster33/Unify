import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import firebase from '../../backend/firebase';

export default function VerificationPage({ navigation }) {
  const handleVerificationCheck = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user.reload()
        .then(() => {
          if (user.emailVerified) {
            // Navigate to the UserHomePage if the user's email is verified
            navigation.navigate('UserHome');
          } else {
            // Display an error message if the email is not verified
            Alert.alert('Error', 'Please verify your email before proceeding.');
          }
        })
        .catch((error) => {
          console.log('Error checking email verification:', error);
          Alert.alert('Error', 'Failed to check email verification status, please try again.');
        });
    } else {
      // Display an error message if the user is not signed in
      Alert.alert('Error', 'You need to be signed in to check your email verification status.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
      >
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.description}>
          Please check your email and click the verification link to verify your email address.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleVerificationCheck}>
          <Text style={styles.buttonText}>Now Verified</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
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