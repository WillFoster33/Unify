// Import necessary dependencies
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the VerificationPage component
export default function VerificationPage() {
  return (
    // Use a linear gradient background for the verification page
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      {/* Container for the verification page content */}
      <View style={styles.container}>
        {/* Title text */}
        <Text style={styles.title}>Email Verification</Text>
        {/* Subtitle text */}
        <Text style={styles.subtitle}>Please check your email for the verification link.</Text>
      </View>
    </LinearGradient>
  );
}

// Styles for the VerificationPage component
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
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Style for the subtitle
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});