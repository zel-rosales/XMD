import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Switch } from 'react-native';

export default function App() {
  const [status, setStatus] = useState('');
  const [label, setLabel] = useState('');
  const [artist, setArtist] = useState('');
  const [member, setMember] = useState('');
  const [album, setAlbum] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [owned, setOwned] = useState(false);

  const handleAddPhotocard = async () => {
  if (!label || !artist || !member || !album) {
    setStatus('Please fill out all required fields.');
    console.log('Missing input');
    return;
  }

  // Construct query string parameters safely
  const queryParams = new URLSearchParams({
    label,
    artist,
    member,
    album,
    favorite: favorite ? '1' : '0',  // convert boolean to '1' or '0'
    owned: owned ? '1' : '0',
  }).toString();

    const url = `https://www.cs.drexel.edu/~gr539/final-project/backend/add_photocard.php?${queryParams}`;

    try {
      const response = await fetch(url, { method: 'GET' });
      const text = await response.text();
      setStatus(text); // Show server response message (e.g. "1 record inserted.")
      console.log('Server response:', text);
    } catch (error) {
      setStatus('Network error: ' + error.message);
      console.error('Fetch error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Photocard</Text>

      <TextInput
        style={styles.input}
        placeholder="Label"
        value={label}
        onChangeText={setLabel}
      />
      <TextInput
        style={styles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={styles.input}
        placeholder="Member"
        value={member}
        onChangeText={setMember}
      />
      <TextInput
        style={styles.input}
        placeholder="Album"
        value={album}
        onChangeText={setAlbum}
      />

      <View style={styles.switchContainer}>
        <Text>Favorite</Text>
        <Switch value={favorite} onValueChange={setFavorite} />
      </View>

      <View style={styles.switchContainer}>
        <Text>Owned</Text>
        <Switch value={owned} onValueChange={setOwned} />
      </View>

      <Button title="Add Photocard" onPress={handleAddPhotocard} />

      <Text style={styles.status}>{status}</Text>

      {/* Live Preview */}
      <View style={styles.preview}>
        <Text style={styles.previewTitle}>Preview</Text>
        <Text>Label: {label}</Text>
        <Text>Artist: {artist}</Text>
        <Text>Member: {member}</Text>
        <Text>Album: {album}</Text>
        <Text>Favorite: {favorite ? 'Yes' : 'No'}</Text>
        <Text>Owned: {owned ? 'Yes' : 'No'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  status: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007700',
  },
  preview: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  previewTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
