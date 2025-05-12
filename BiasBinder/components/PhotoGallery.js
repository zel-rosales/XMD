import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { photocardData } from './photocardData';
import { photocardImages } from './photocardImages';
import { useNavigation } from '@react-navigation/native';

const PhotoGallery = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
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
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

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
});

export default PhotoGallery;
