// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Import screen components
import HomePage from './frontend/Screens/HomePage';
import SignupPage from './frontend/Screens/SignupPage';
import LoginPage from './frontend/Screens/LoginPage';
import VerificationPage from './frontend/Screens/VerificationPage';
import UserHomePage from './frontend/Screens/UserHomePage';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the main App component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Define the screens and their options */}
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Verification" component={VerificationPage} options={{ headerShown: false }} />
        <Stack.Screen name="UserHome" component={UserHomePage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}