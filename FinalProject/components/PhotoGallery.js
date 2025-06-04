// components/PhotoGallery.js
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const sampleCards = [
  { id: '1', name: 'Wooyoung (ATEEZ)', image: require('../assets/photocards/wy_fever.jpg') },
  // Add more cards as needed
];

const PhotoGallery = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Viewing', { photocard: item })}>
      <Card style={styles.card}>
        <Card.Cover source={item.image} style={styles.image} />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.caption}>{item.name}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={sampleCards}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.gallery}
    />
  );
};

const styles = StyleSheet.create({
  gallery: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
  },
  image: {
    height: 150,
  },
  caption: {
    marginTop: 5,
    fontWeight: '500',
  },
});

export default PhotoGallery;
