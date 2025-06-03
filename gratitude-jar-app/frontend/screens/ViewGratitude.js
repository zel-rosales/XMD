// screens/ViewGratitude.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ViewGratitude() {
  const [gratitudes, setGratitudes] = useState([]);

  useEffect(() => {
    const fetchGratitudes = async () => {
      try {
        const response = await fetch('https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/get_gratitudes.php');
        const text = await response.text();
        console.log('Raw response:\n' + text); // Debug print

        // Parse the plain text data into an array of objects
        const entries = text
          .trim()
          .split('\n')
          .map(line => {
            const [id, thankful] = line.split('||');
            return { id, text: thankful };
          });

        setGratitudes(entries);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchGratitudes();
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
