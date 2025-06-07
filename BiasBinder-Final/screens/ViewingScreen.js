import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { Card, Appbar, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { photocardImages } from '../components/photocardImages';
// import { PhotocardContext } from '../context/PhotocardContext'; 

const ViewingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { card } = route.params;

  // Access the context
  const { favorites, ownership, toggleFavorite, toggleOwnership } = useContext(PhotocardContext);

  // Determine initial states for favorite and ownership based on context
  const isFavorite = favorites[card.id] || false;
  const ownsCard = ownership[card.id] === 'Own';

  // Toggle favorite and ownership using the context functions
  const handleFavoriteToggle = () => {
    toggleFavorite(card.id);
  };

  const handleOwnershipToggle = () => {
    toggleOwnership(card.id);
  };

  return (
      <View style={styles.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Photocard Details" />
        </Appbar.Header>

        <Card style={styles.card}>
          <Card.Cover source={photocardImages[card.imageKey]} style={styles.image} />
          <Card.Content>
            <View style={styles.headerRow}>
              <Text style={styles.label}>{card.label}</Text>
              <IconButton
                icon={isFavorite ? 'heart' : 'heart-outline'}
                iconColor={isFavorite ? 'red' : 'gray'}
                size={24}
                onPress={handleFavoriteToggle}
              />
            </View>
            <Text style={styles.description}>
              {card.description || 'No additional details available.'}
            </Text>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>{ownsCard ? 'Own' : 'ISO'}</Text>
              <Switch value={ownsCard} onValueChange={handleOwnershipToggle} />
            </View>
          </Card.Content>
        </Card>
      </View>
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
