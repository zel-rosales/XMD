// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [entry, setEntry] = useState('');
  const [status, setStatus] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddEntry = async() => {
    if(!entry) {
      setStatus('Please enter values into all boxes.');
      return;
    }

    // HTTP request
    const query=`thankful=${entry}`;
    const url = `https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/add_gratitude.php?${query}`;

    // Fetch mechanism
    try {
      const response = await fetch(url, { method: 'GET' });
      const text = await response.text();
      setStatus(`✅ Entry saved: ${entry}`);
      setEntry('');
      handleLoadEntries();
    } catch (error) {
      setStatus('Networking problem: ' + error.message);
      console.log('Fetch error: ', error.message);
    }
  };

  const handleLoadEntries = async () => {
    try {
      const response = await fetch('https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/get_gratitudes.php');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.log('Fetch error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gratitude Jar</Text>

      <TextInput 
        style={styles.entryInput} 
        value={entry} 
        onChangeText={setEntry} 
      />
      <Button title='Submit' onPress={handleAddEntry} />

      <Text>{status}</Text>

      <View style={styles.separator} />

      <Button title='Load Gratitudes' onPress={handleLoadEntries} />

      <ScrollView style={styles.entriesContainer}>
        {entries.map((e, index) => (
          <Text key={index} style={styles.entryItem}>• {e}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  entryInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
    separator: {
    marginVertical: 20,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  entriesContainer: {
    marginTop: 10,
    maxHeight: 300,
  },
  entryItem: {
    paddingVertical: 5,
    fontSize: 16,
  },
});