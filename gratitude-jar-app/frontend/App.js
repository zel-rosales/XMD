// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [entry, setEntry] = useState('');
  const [status, setStatus] = useState('');

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
    } catch (error) {
      setStatus('Networking problem: ' + error.message);
      console.log('Fetch error: ', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gratitude Jar</Text>

      <TextInput style={styles.entryInput} value={entry} onChangeText={setEntry} />
      <Button title='Submit' onPress={handleAddEntry} />

      <Text>{status}</Text>
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
    fontSize: 24,
  },
  entryInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,

  },
});