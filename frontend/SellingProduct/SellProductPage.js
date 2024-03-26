import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SellProductPage({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    'Tickets',
    'Furniture',
    'Textbooks',
    'Clothes',
    'Sports equipment',
    'Electronics',
    'Instruments',
    'Dorm essentials',
    'Art supplies',
    'Other',
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('UserHome')} style={styles.homeButton}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerTitle: 'Sell Product',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#192f6a',
      },
    });
  }, [navigation]);

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>What are you selling?</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('ProductDescription', { category: selectedCategory })}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesContainer: {
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    minWidth: 200,
  },
  selectedCategoryButton: {
    backgroundColor: 'white',
  },
  categoryButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  selectedCategoryButtonText: {
    color: '#192f6a',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  homeButton: {
    marginLeft: 10,
  },
});