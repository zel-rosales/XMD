// frontend/screens/AddPhotocardScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Switch } from 'react-native';
import { Button } from 'react-native-paper';
import globalStyles from '../StyleSheet';

export default function AddPhotocardScreen() {
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Add Photocard</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Label"
        value={label}
        onChangeText={setLabel}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Member"
        value={member}
        onChangeText={setMember}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Album"
        value={album}
        onChangeText={setAlbum}
      />

      <View style={globalStyles.switchContainer}>
        <Text>Favorite</Text>
        <Switch value={favorite} onValueChange={setFavorite} />
      </View>

      <View style={globalStyles.switchContainer}>
        <Text>Owned</Text>
        <Switch value={owned} onValueChange={setOwned} />
      </View>

      <Text style={globalStyles.status}>{status}</Text>

      <View style={globalStyles.buttonContainerBottom}>
        <Button 
          mode="contained" 
          onPress={handleAddPhotocard} 
          style={globalStyles.button}
          >
            Add Photocard
        </Button>
      </View>
    </View>
  );
}
