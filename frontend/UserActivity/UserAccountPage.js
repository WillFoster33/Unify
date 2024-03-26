import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserAccount({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      {/* Add form fields and components for item details */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});