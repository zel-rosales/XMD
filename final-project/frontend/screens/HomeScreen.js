// frontend/screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../StyleSheet';

// Import custom components
import PhotocardList from '../components/PhotocardList';

export default function HomeScreen({ navigation }) {
  const [photocards, setPhotocards] = useState([]);
  const [error, setError] = useState(null);

  const fetchPhotocards = useCallback(() => {
    fetch('https://www.cs.drexel.edu/~gr539/final-project/backend/get_photocards.php')
      .then((response) => response.json())
      .then((data) => {
        setPhotocards(data);
        setError(null);
      })
      .catch((err) => {
        setError('Failed to load data');
        console.error(err);
      });
  }, []);

  // Reload data every time screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchPhotocards();
    }, [fetchPhotocards])
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Your Photocard Binder</Text>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <PhotocardList 
        data={photocards} 
        onPress={(card) => navigation.navigate('Edit Photocard', { card })} 
      />
    </View>
  );
}
