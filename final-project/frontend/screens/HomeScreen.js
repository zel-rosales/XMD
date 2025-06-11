// frontend/screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../StyleSheet';

// Import custom components
import PhotocardList from '../components/PhotocardList';

export default function HomeScreen({ navigation }) {
  const [photocards, setPhotocards] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'owned', 'iso', or 'favorite'

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

  // Filter logic
  const getFilteredPhotocards = () => {
    switch (filter) {
      case 'owned':
        return photocards.filter(card => card.owned === 1 || card.owned === '1');
      case 'iso':
        return photocards.filter(card => card.owned === 0 || card.owned === '0');
      case 'favorite':
        return photocards.filter(card => card.favorite === 1 || card.favorite === '1');
      default:
        return photocards;
    }
  };

  const filteredPhotocards = getFilteredPhotocards();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>My Photocard Binder</Text>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* Filter Photocards */}
      <View style={globalStyles.picker}>
        <Text style={globalStyles.sectionLabel}>Filter by:</Text>
        <Picker
          selectedValue={filter}
          onValueChange={(value) => setFilter(value)}
          style={{ height: 50, width: '100%' }}
        >
          <Picker.Item label="Show All" value="all" />
          <Picker.Item label="Owned" value="owned" />
          <Picker.Item label="ISO" value="iso" />
          <Picker.Item label="Favorites" value="favorite" />
        </Picker>
      </View>

      <PhotocardList 
        data={filteredPhotocards} 
        onPress={(card) => navigation.navigate('Edit Photocard', { card })} 
      />
    </View>
  );
}
