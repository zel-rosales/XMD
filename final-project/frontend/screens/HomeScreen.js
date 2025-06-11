// frontend/screens/HomeScreen.js
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from '../StyleSheet';

export default function HomeScreen({ navigation }) {
  const [photocards, setPhotocards] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetch('https://www.cs.drexel.edu/~gr539/final-project/backend/get_photocards.php')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPhotocards(data);
  //     })
  //     .catch((err) => {
  //       setError('Failed to load data');
  //       console.error(err);
  //     });
  // }, []);

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

      <FlatList
        data={photocards}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={globalStyles.cardList}
        renderItem={({ item }) => (
          <TouchableOpacity style={globalStyles.card} onPress={() => navigation.navigate('Edit Photocard', { card: item })}>
            <View style={globalStyles.cardInner}>
              <View style={globalStyles.cardHeader}>
                <Text style={globalStyles.cardTitle}>{item.label}</Text>
              </View>

              <Text style={globalStyles.cardText}>{item.artist}</Text>
              <Text style={globalStyles.cardText}>{item.member}</Text>
              <Text style={globalStyles.cardText}>{item.album}</Text>

              <View style={globalStyles.tagContainer}>
                <Text style={[globalStyles.tag, 
                  item.owned === '1' || item.owned === 1 ? globalStyles.ownedTag : globalStyles.isoTag]}>
                  {item.owned === '1' || item.owned === 1 ? 'Owned' : 'ISO'}
                </Text>
                {item.favorite === '1' || item.favorite === 1 && (
                  <MaterialCommunityIcons name="heart" size={20} color="red" />)}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
