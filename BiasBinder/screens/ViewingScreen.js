// screens/ViewingScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Appbar } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { photocardImages } from '../components/photocardImages';

const ViewingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { card } = route.params;

  if (!card) {
    return (
      <View style={styles.centered}>
        <Text>No photocard data found.</Text>
      </View>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Photocard Details" />
      </Appbar.Header>

      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover source={photocardImages[card.imageKey]} style={styles.image} />
          <Card.Content>
            <Text style={styles.label}>{card.label}</Text>
            <Text style={styles.description}>
              {card.description || 'No additional details available.'}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    elevation: 3,
  },
  image: {
    width: 372,
    height: 500,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewingScreen;
