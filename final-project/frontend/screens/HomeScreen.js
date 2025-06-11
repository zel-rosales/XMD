// frontend/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import globalStyles from '../StyleSheet'; // assuming you're using this

export default function HomeScreen() {
  const [photocards, setPhotocards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.cs.drexel.edu/~gr539/final-project/backend/get_photocards.php')
      .then((response) => response.json())
      .then((data) => {
        setPhotocards(data);
      })
      .catch((err) => {
        setError('Failed to load data');
        console.error(err);
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Your Photocard Binder</Text>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      <FlatList
        data={photocards}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={globalStyles.cardList}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.label}</Text>
            <Text style={globalStyles.cardText}>{item.artist}</Text>
            <Text style={globalStyles.cardText}>{item.member}</Text>
            <Text style={globalStyles.cardText}>{item.album}</Text>
          </View>
        )}
      />
    </View>
  );
}
