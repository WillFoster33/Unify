import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert, Image, ActionSheetIOS } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import firebase from '../../backend/firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfilePictureScreen({ route, navigation }) {
    const { firstName, lastName, selectedInterests } = route.params;
    const [profilePicture, setProfilePicture] = useState(null);
    const [fadeAnimation] = useState(new Animated.Value(0));

    const handleProfilePicturePress = async () => {
        const { status: cameraRollStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    
        if (cameraRollStatus !== 'granted' || cameraStatus !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll and camera permissions to select a profile picture.');
            return;
        }
    
        const options = ['Select from Camera Roll', 'Take a Photo', 'Cancel'];
        const cancelButtonIndex = 2;
    
        const actionSheetOptions = {
            options,
            cancelButtonIndex,
        };
    
        ActionSheetIOS.showActionSheetWithOptions(actionSheetOptions, async (buttonIndex) => {
            if (buttonIndex === 0) {
                // Select from Camera Roll
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
    
                if (!result.cancelled) {
                    setProfilePicture(result.assets[0].uri);
                }
            } else if (buttonIndex === 1) {
                // Take a Photo
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
    
                if (!result.cancelled) {
                    setProfilePicture(result.assets[0].uri);
                }
            }
        });
    };

    const uploadProfilePicture = async (userId) => {
        if (profilePicture) {
            try {
                const response = await fetch(profilePicture);
                const blob = await response.blob();

                const ref = firebase.storage().ref().child(`profile_pictures/${userId}/profile.jpg`);
                const snapshot = await ref.put(blob);

                if (snapshot.state === 'success') {
                    const downloadURL = await ref.getDownloadURL();
                    console.log('Profile picture uploaded successfully. Download URL:', downloadURL);
                    return downloadURL;
                } else {
                    console.error('Error uploading profile picture. Snapshot state:', snapshot.state);
                    return null;
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
                return null;
            }
        }
        console.log('No profile picture selected');
        return null;
    };

    const handleCreateProfile = async () => {
        const displayName = `${firstName} ${lastName}`;
    
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                const profilePictureURL = await uploadProfilePicture(user.uid);
    
                // Store the user's display name, interests, and profile picture URL in Firestore
                await firebase.firestore().collection('users').doc(user.uid).set({
                    displayName,
                    interests: selectedInterests,
                    profilePicture: profilePictureURL,
                });
    
                console.log('Profile created successfully');
                navigation.navigate('UserHome');
            } else {
                console.log('User not authenticated');
            }
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };
    React.useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnimation }]}>
                <TouchableOpacity onPress={handleProfilePicturePress}>
                    {profilePicture ? (
                        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                    ) : (
                        <View style={styles.profilePictureContainer}>
                            <Icon name="account-circle" type="material-community" size={120} color="white" />
                            <Text style={styles.addProfilePictureText}>Tap to add profile picture</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <Text style={styles.title}>Upload Profile Picture</Text>
                <TouchableOpacity style={styles.createButton} onPress={handleCreateProfile}>
                    <Text style={styles.createButtonText}>Create Profile</Text>
                </TouchableOpacity>
            </Animated.View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
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
        width: '100%',
    },
    profilePictureContainer: {
        alignItems: 'center',
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    addProfilePictureText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: '#2196F3',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});