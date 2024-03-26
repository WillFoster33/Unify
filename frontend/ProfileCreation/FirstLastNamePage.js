import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FirstLastNameScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [fadeAnimation] = useState(new Animated.Value(0));

    React.useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleNext = () => {
        if (!firstName || !lastName) {
            Alert.alert('First and Last Name Required', 'Please enter your first and last name to proceed.');
            return;
        }
        navigation.navigate('Interests', { firstName, lastName });
    };

    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnimation }]}>
                <Text style={styles.title}>Enter Your Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={lastName}
                    onChangeText={setLastName}
                />
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