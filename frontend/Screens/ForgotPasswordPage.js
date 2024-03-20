import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ForgotPasswordPage({ navigation }) {
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
          <View style={styles.container}>
            <Text style={styles.title}>Check Your Email</Text>
            <Text style={styles.subtitle}>An email with a link to reset your password has been sent to your email.</Text>
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