import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function VerificationPage() {
  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.subtitle}>Please check your email for the verification link.</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});