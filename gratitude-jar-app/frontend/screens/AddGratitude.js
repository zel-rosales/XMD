// Form to write a note
// screens/AddGratitude.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddGratitude() {
  const [entry, setEntry] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (entry.trim() === '') {
      Alert.alert('Please enter something you’re grateful for.');
      return;
    }

    // For now, just simulate a successful submission
    console.log('Gratitude Entry Submitted:', entry);
    setSubmitted(true);
    setEntry('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you grateful for today?</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your gratitude here..."
        value={entry}
        onChangeText={setEntry}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
      {submitted && (
        <Text style={styles.confirmation}>✅ Entry saved locally!</Text>
      )}
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
    fontSize: 18,
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
    color: 'green',
    textAlign: 'center',
    fontWeight: '500',
  },
});