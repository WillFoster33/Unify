import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from './backend/firebase';

export default function VerifyLink({ navigation }) {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleVerifyLink = async () => {
      try {
        const emailLink = await firebase.auth().isSignInWithEmailLink(window.location.href);
        if (emailLink) {
          const email = window.localStorage.getItem('emailForSignIn');
          if (!email) {
            setError('No email found for verification');
            setIsVerifying(false);
            return;
          }
          await firebase.auth().signInWithEmailLink(email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          setIsVerified(true);
        } else {
          setError('Invalid verification link');
        }
      } catch (error) {
        setError(error.message);
      }
      setIsVerifying(false);
    };

    handleVerifyLink();
  }, []);

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      <View style={styles.container}>
        {isVerifying ? (
          <Text style={styles.text}>Verifying link...</Text>
        ) : isVerified ? (
          <>
            <Text style={styles.text}>Email verified successfully!</Text>
            <Text style={styles.text}>You can now log in with your email and password.</Text>
            {/* Add a button or link to navigate to the login screen */}
          </>
        ) : (
          <>
            <Text style={styles.text}>Verification failed:</Text>
            <Text style={styles.error}>{error}</Text>
            {/* Add a button or link to navigate to the signup screen */}
          </>
        )}
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
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});