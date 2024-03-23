import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import firebase from '../../backend/firebase';

export default function VerificationPage({ navigation }) {
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    let timer;
    if (!canResend) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            setCanResend(true);
            clearInterval(timer);
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canResend]);

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

  const handleResendEmail = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      user.sendEmailVerification()
        .then(() => {
          Alert.alert('Email Sent', 'Verification email has been sent to your email address.');
          setCanResend(false);
          setCountdown(20);
        })
        .catch((error) => {
          console.log('Error sending verification email:', error);
          Alert.alert('Error', 'Failed to send verification email, please try again.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.description}>
          Please check your email and click the verification link to verify your email address.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleVerificationCheck}>
          <Text style={styles.buttonText}>Now Verified</Text>
        </TouchableOpacity>
        <View style={styles.resendButtonContainer}>
          <TouchableOpacity
            style={[styles.resendButton, canResend ? styles.resendButtonEnabled : styles.resendButtonDisabled]}
            onPress={handleResendEmail}
            disabled={!canResend}
          >
            <Text style={styles.resendButtonText}>{canResend ? 'Resend Email' : `Resend in ${countdown}s`}</Text>
          </TouchableOpacity>
        </View>
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
  resendButtonContainer: {
    marginTop: 30,
  },
  resendButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resendButtonEnabled: {
    backgroundColor: '#2196F3',
  },
  resendButtonDisabled: {
    backgroundColor: 'rgba(33, 150, 243, 0.5)',
  },
  resendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});