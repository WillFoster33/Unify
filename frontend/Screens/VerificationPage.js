import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import firebase from '../../backend/firebase';

export default function VerificationPage({ navigation }) {
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [scaleAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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
            navigation.navigate('UserHome');
          } else {
            Alert.alert('Error', 'Please verify your email before proceeding.');
          }
        })
        .catch((error) => {
          console.log('Error checking email verification:', error);
          Alert.alert('Error', 'Failed to check email verification status, please try again.');
        });
    } else {
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
        <Animated.View style={[styles.contentContainer, { transform: [{ scale: scaleAnimation }] }]}>
          <Icon name="email" type="material-community" size={80} color="white" />
          <Text style={styles.title}>Email Verification</Text>
          <Text style={styles.description}>
            Please check your email and click the verification link to verify your email address.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleVerificationCheck}>
            <Text style={styles.buttonText}>Verify Now</Text>
          </TouchableOpacity>
          <View style={styles.resendButtonContainer}>
            <TouchableOpacity
              style={[styles.resendButton, canResend ? styles.resendButtonEnabled : styles.resendButtonDisabled]}
              onPress={handleResendEmail}
              disabled={!canResend}
            >
              <Text style={styles.resendButtonText}>{canResend ? 'Resend Email' : `Resend in ${countdown}s`}</Text>
            </TouchableOpacity>
            <Text style={styles.footnote}>Didn't get an email? Check your spam folder or try resending.</Text>
          </View>
        </Animated.View>
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
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
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
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButtonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resendButton: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resendButtonEnabled: {
    backgroundColor: 'white',
  },
  resendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  resendButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footnote: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});