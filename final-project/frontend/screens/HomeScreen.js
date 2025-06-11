// frontend/screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../StyleSheet';

// Import custom components
import PhotocardList from '../components/PhotocardList';

export default function HomeScreen({ navigation }) {
  const [photocards, setPhotocards] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'owned', 'iso', or 'favorite'
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter & Search logic - update photocard list dynamically
  const getFilteredPhotocards = () => {
    let filtered = photocards;

    // First, apply picker filter
    switch (filter) {
      case 'owned':
        filtered = filtered.filter(card => card.owned === 1 || card.owned === '1');
        break;
      case 'iso':
        filtered = filtered.filter(card => card.owned === 0 || card.owned === '0');
        break;
      case 'favorite':
        filtered = filtered.filter(card => card.favorite === 1 || card.favorite === '1');
        break;
      default:
        break;
    }

    // Then, apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(card =>
        (card.label && card.label.toLowerCase().includes(query)) ||
        (card.artist && card.artist.toLowerCase().includes(query)) ||
        (card.member && card.member.toLowerCase().includes(query)) ||
        (card.album && card.album.toLowerCase().includes(query))
      );
    }

    // Results
    return filtered;
  };

  const filteredPhotocards = getFilteredPhotocards();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>My Photocard Binder</Text>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <View style={globalStyles.filterContainer}>
        {/* Search Bar */}
        <TextInput
          style={globalStyles.searchInput}
          placeholder="Search by group, member, album..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Filter Photocards */}
        <View style={globalStyles.picker}>
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
      </View>

      <Text style={{ fontSize: 14, marginVertical: 8 }}>
        Showing {filteredPhotocards.length} of {photocards.length} card{filteredPhotocards.length !== 1 ? 's' : ''} 
      </Text>

      {/* Photocard List */}
      <PhotocardList 
        data={filteredPhotocards} 
        onPress={(card) => navigation.navigate('Edit Photocard', { card })} 
      />
    </View>
  );
}
