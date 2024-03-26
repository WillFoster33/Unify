import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function InterestsScreen({ route, navigation }) {
    const { firstName, lastName } = route.params;
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [fadeAnimation] = useState(new Animated.Value(0));

    const interests = ['Tickets', 'Furniture', 'Textbooks', 'Clothes', 'Sports equipment', 'Electronics', 'Instruments', 'Dorm essentials', 'Art supplies'];

    const handleInterestPress = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    React.useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleNext = () => {
        navigation.navigate('ProfilePicture', { firstName, lastName, selectedInterests });
    };

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnimation }]}>
                <Text style={styles.title}>Select Your Interests</Text>
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
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>Next</Text>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
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
    nextButton: {
        backgroundColor: '#2196F3',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});