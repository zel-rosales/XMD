// Form to write a note
// screens/AddGratitude.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddGratitude() {
  const [entry, setEntry] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    if (entry.trim() === '') {
      setStatus('Please enter something you’re grateful for.');
      Alert.alert('Please enter something you’re grateful for.');
      return;
    }

    // HTTP request
    const query=`thankful=${entry}`;
    const url = `https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/add_gratitude.php?${query}`;

    try {
      const response = await fetch(url, { method: 'GET'});
      const text = await response.text();
      // console.log('Raw server response:', text);  // log raw response text
      setStatus(`✅ Entry saved: ${entry}`);
    } catch (error) {
      // console.error('Network error:', error);
      setStatus('Networking problem: ' + error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you grateful for today?</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your gratitude here..."
        value={entry}
        onChangeText={setEntry}
      />
      <Button title="Submit" onPress={handleSubmit} />

      <Text style={styles.confirmation}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    height: 100,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  confirmation: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});