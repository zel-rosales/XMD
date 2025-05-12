import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { photocardData } from './photocardData';
import { photocardImages } from './photocardImages';
import { useNavigation } from '@react-navigation/native';
import { PhotocardContext } from '../context/PhotocardContext';  // Import context

const PhotoGallery = () => {
  const navigation = useNavigation();
  const { favorites, ownership, toggleFavorite, toggleOwnership } = useContext(PhotocardContext); // Access context

  const renderItem = ({ item }) => {
    const isFavorited = favorites[item.id];
    const cardOwnership = ownership[item.id];

    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => navigation.navigate('Viewing', { card: item })}
      >
        <Card style={styles.card}>
          <Card.Cover
            source={photocardImages[item.imageKey]}
            style={styles.image}
          />
            <Card.Content style={styles.captionContainer}>
            <Text style={styles.caption}>{item.label}</Text>

            <View style={styles.metaRow}> {/* <- NEW wrapper */}
                {/* Heart Icon */}
                <IconButton
                icon={isFavorited ? 'heart' : 'heart-outline'}
                color={isFavorited ? 'red' : 'gray'}
                size={20}
                style={styles.heartIcon}
                onPress={() => toggleFavorite(item.id)}
                />

                {/* Ownership Tag */}
                {cardOwnership && (
                <Text style={styles.ownershipTag}>
                    {cardOwnership}
                </Text>
                )}
            </View>
            </Card.Content>

        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={photocardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  cardWrapper: {
    flex: 1,
    margin: 5,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  captionContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  caption: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  heartIcon: {
    marginTop: 5, // Space between caption and heart icon
  },
  ownershipTag: {
    fontSize: 12,
    color: '#555',
    marginTop: 5, // Space between heart icon and ownership tag
  },
  metaRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // optional spacing between heart and label
    marginTop: 5,
  },
});

export default PhotoGallery;
