// screens/ViewingScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { Card, Appbar, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { photocardImages } from '../components/photocardImages';

const ViewingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { card } = route.params;

  const [isFavorite, setIsFavorite] = useState(false);
  const [ownsCard, setOwnsCard] = useState(false); // false = ISO, true = Own

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleOwnership = () => {
    setOwnsCard(!ownsCard);
  };

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
            <View style={styles.headerRow}>
              <Text style={styles.label}>{card.label}</Text>
              <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                iconColor={isFavorite ? 'red' : 'gray'}
                size={24}
                onPress={toggleFavorite}
              />
            </View>
            <Text style={styles.description}>
              {card.description || 'No additional details available.'}
            </Text>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{ownsCard ? 'Own' : 'ISO'}</Text>
              <Switch value={ownsCard} onValueChange={toggleOwnership} />
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flex: 1,
  },
  image: {
    height: 300,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  description: {
    marginTop: 12,
    fontSize: 16,
    color: '#444',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default ViewingScreen;
