// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from '../../backend/firebase';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import { AntDesign } from '@expo/vector-icons';

// Define the UserHomePage component
export default function UserHomePage({ navigation }) {
  const [userData, setUserData] = useState(null);
  const user = firebase.auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle user sign out
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
    // Use a linear gradient background for the user home page
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.background}>
      {/* Wrap the content with MenuProvider */}
      <MenuProvider>
        {/* Container for the user home page content */}
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            {/* App Name */}
            <Text style={styles.appName}>UniFy</Text>
            {/* Profile Picture Button */}
            <View style={styles.profilePictureContainer}>
              <Menu>
                <MenuTrigger>
                  <Image source={{ uri: userData?.profilePicture }} style={styles.profilePicture} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => navigation.navigate('Account')}>
                    <Text style={styles.menuOption}>Your Account</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => navigation.navigate('Interests')}>
                    <Text style={styles.menuOption}>Your Interests</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => navigation.navigate('Help')}>
                    <Text style={styles.menuOption}>Help</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => navigation.navigate('About')}>
                    <Text style={styles.menuOption}>About</Text>
                  </MenuOption>
                  <MenuOption onSelect={handleSignOut}>
                    <Text style={styles.menuOption}>Log Out</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>

          {/* Display the welcome message with the user's display name */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Welcome, {userData?.displayName}!</Text>
            {/* Display a message indicating the user is logged in */}
            <Text style={styles.text}>You are now logged in.</Text>
          </View>

          {/* Plus Sign Button */}
          <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('SellProduct')}>
            <AntDesign name="plus" size={60} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </MenuProvider>
    </LinearGradient>
  );
}

// Styles for the UserHomePage component
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  profilePictureContainer: {
    zIndex: 1,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});