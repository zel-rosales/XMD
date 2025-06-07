// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default function App() {
  const [entry, setEntry] = useState('');
  const [status, setStatus] = useState('');
  const [entries, setEntries] = useState([]);
  const [randomEntry, setRandomEntry] = useState('');
  const [clearStatus, setClearStatus] = useState('');
  const [showEntries, setShowEntries] = useState(false);

  // User input entry
  const handleAddEntry = async () => {
    if (!entry) {
      setStatus('Please share something you\'re thankful for.');
      return;
    }

    const query = `thankful=${entry}`;
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
    }
  };

  // Pick random entry from database
  const handleGetRandomEntry = async () => {
    try {
      const response = await fetch('https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/get_random_gratitude.php');
      const data = await response.json();
      setRandomEntry(data.thankful ? data.thankful : 'No gratitude entries found.');
    } catch (error) {
      setRandomEntry('Fetch error: ' + error.message);
    }
  };

  // Loads entry for submission confirmation
  const handleLoadEntries = async () => {
    try {
      const response = await fetch('https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/get_gratitudes.php');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.log('Fetch error:', error.message);
    }
  };

  // Toggle display/hide all entries
  const handleToggleEntries = async () => {
    if (!showEntries) {
      try {
        const response = await fetch('https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/get_gratitudes.php');
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.log('Fetch error:', error.message);
      }
    }
    setShowEntries(!showEntries);
  };

  // Empties database
  const handleClearEntries = async () => {
    try {
      const response = await fetch(
        'https://www.cs.drexel.edu/~gr539/gratitude-jar-app/backend/clear_gratitudes.php',
        { method: 'POST' }
      );
      const data = await response.json();
      if (data.success) {
        setEntries([]);
        setRandomEntry('');
        setClearStatus('Jar emptied!');
      } else {
        setClearStatus('Could not clear entries.');
      }
    } catch (err) {
      setClearStatus('Fetch error: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fixedArea}>
        <Text style={styles.title}>Gratitude Jar</Text>

        {/* User enters entry */}
        <TextInput
          style={styles.entryInput}
          value={entry}
          onChangeText={setEntry}
          placeholder="What are you thankful for?"
        />
        <Button 
          style={styles.button}
          title="Submit" 
          onPress={handleAddEntry} 
        />
        <Text>{status}</Text>

        <View style={styles.separator} />

        {/* Pick entry from database */}
        <Button 
          style={styles.button}
          title="Pick a Random Gratitude" 
          onPress={handleGetRandomEntry} 
        />
        <Text style={styles.resultText}>{randomEntry}</Text>

        {/* Empty database */}
        <Button 
          style={styles.button}
          color="#b71c1c" 
          title="Clear All Gratitudes" 
          onPress={handleClearEntries} 
        />
        <Text>{clearStatus}</Text>

        {/* Toggle display/hide entries */}
        <Button 
          style={styles.button}
          title={showEntries ? 'Hide Gratitudes' : 'Load Gratitudes'} 
          onPress={handleToggleEntries} 
        />
      </View>

      <View style={styles.scrollArea}>
        {showEntries && (
          <ScrollView style={styles.entriesContainer}>
            {entries.map((e, index) => (
              <Text key={index} style={styles.entryItem}>• {e}</Text>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  fixedArea: {
    flexShrink: 0,
    alignItems: 'center',
  },
  scrollArea: {
    flex: 1,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  entryInput: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    width: '100%',
  },
  entriesContainer: {
    paddingVertical: 10,
  },
  entryItem: {
    paddingVertical: 5,
    fontSize: 16,
  },
  resultText: {
    marginVertical: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
});
