// Shows past entries
// screens/ViewGratitude.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ViewGratitude() {
  const [gratitudes, setGratitudes] = useState([]);

  useEffect(() => {
    // Placeholder simulated data — replace with API call later
    const sampleData = [
      { id: '1', text: 'Had a great coffee today' },
      { id: '2', text: 'Talked to a good friend' },
      { id: '3', text: 'Got some fresh air and sunshine' },
    ];
    setGratitudes(sampleData);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.entryText}>• {item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Gratitude Entries</Text>
      <FlatList
        data={gratitudes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No entries to show yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    // backgroundColor: '#e6f7ff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  entryText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
