import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import firebase from '../../backend/firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileCreationPage({ navigation }) {
    const [displayName, setDisplayName] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [fadeAnimation] = useState(new Animated.Value(0));
    const [scaleAnimation] = useState(new Animated.Value(0));
    const [profilePicture, setProfilePicture] = useState(null);

    const interests = ['Tickets', 'Furniture', 'Textbooks', 'Clothes', 'Sports equipment', 'Electronics', 'Instruments', 'Dorm essentials', 'Art supplies'];

    const handleInterestPress = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const handleProfilePicturePress = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to select a profile picture.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfilePicture(result.assets[0].uri);
        }
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
        if (!displayName) {
            Alert.alert('Display Name Required', 'Please enter a display name to create your profile.');
            return;
        }

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

        Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 500,
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
                <Text style={styles.title}>Create Your Profile</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Display Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={displayName}
                    onChangeText={setDisplayName}
                />
                <Text style={styles.subtitle}>Select Your Interests:</Text>
                <View style={styles.interestsContainer}>
                    {interests.map((interest, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.interestButton,
                                selectedInterests.includes(interest) && styles.selectedInterestButton,
                            ]}
                            onPress={() => handleInterestPress(interest)}
                        >
                            <Text
                                style={[
                                    styles.interestButtonText,
                                    selectedInterests.includes(interest) && styles.selectedInterestButtonText,
                                ]}
                            >
                                {interest}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
    subtitle: {
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        paddingHorizontal: 20,
        marginBottom: 20,
        color: 'white',
        fontSize: 18,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 30,
    },
    interestButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginBottom: 10,
    },
    selectedInterestButton: {
        backgroundColor: 'white',
    },
    interestButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedInterestButtonText: {
        color: '#192f6a',
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