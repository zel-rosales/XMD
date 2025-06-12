// frontend/screens/EditPhotocardScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import globalStyles from '../StyleSheet';

export default function EditPhotocardScreen({ route, navigation }) {
  const { card } = route.params;

  const [label, setLabel] = useState(card.label);
  const [artist, setArtist] = useState(card.artist);
  const [member, setMember] = useState(card.member);
  const [album, setAlbum] = useState(card.album);
  const [favorite, setFavorite] = useState(card.favorite === '1' || card.favorite === 1);
  const [owned, setOwned] = useState(card.owned === '1' || card.owned === 1);
  const [wts, setWTS] = useState(card.wts === 1 || card.wts === '1');
  const [wtt, setWTT] = useState(card.wtt === 1 || card.wtt === '1');
  const [wtb, setWTB] = useState(card.wtb === 1 || card.wtb === '1');
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    const queryParams = new URLSearchParams({
      id: card.id,
      label,
      artist,
      member,
      album,
      favorite: favorite ? '1' : '0',
      owned: owned ? '1' : '0',
      wts: wts ? '1' : '0', 
      wtt: wtt ? '1' : '0',
      wtb: wtb ? '1' : '0',
    }).toString();

    const url = `https://www.cs.drexel.edu/~gr539/final-project/backend/edit_photocard.php?${queryParams}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setStatus(data);
      console.log('Save response:', data);

      if (data.success) {
        navigation.goBack(); // go back to Home screen
      } else {
        setStatus('Save failed: ' + data.message);
      }
    } catch (error) {
        setStatus('Save failed: ' + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const url = `https://www.cs.drexel.edu/~gr539/final-project/backend/delete_photocard.php?id=${card.id}`;
      const response = await fetch(url, { method: 'GET' });
      const text = await response.text();
      console.log('Deleted:', text);
      navigation.goBack(); // Go back to Home after deletion
    } catch (error) {
        console.error('Error deleting photocard:', error);
        setStatus('Delete failed: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.header}>Edit Photocard</Text>

      {/* Photocard details */}
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

      {/* Favorite & Ownership toggles */}
      <View style={globalStyles.switchContainer}>
        <Text>Favorite</Text>
        <Switch value={favorite} onValueChange={setFavorite} />
      </View>

      <View style={globalStyles.switchContainer}>
        <Text>Owned</Text>
        <Switch value={owned} onValueChange={setOwned} />
      </View>

      {/* Tags: WTS, WTT, WTB */}
      <Text style={globalStyles.sectionLabel}>Tags:</Text>
      <View style={globalStyles.checkboxRow}>
        <Checkbox
          status={wts ? 'checked' : 'unchecked'}
          onPress={() => setWTS(!wts)}
        />
        <Text>Willing to Sell (WTS)</Text>
      </View>
      <View style={globalStyles.checkboxRow}>
        <Checkbox
          status={wtt ? 'checked' : 'unchecked'}
          onPress={() => setWTT(!wtt)}
        />
        <Text>Willing to Trade (WTT)</Text>
      </View>
      <View style={globalStyles.checkboxRow}>
        <Checkbox
          status={wtb ? 'checked' : 'unchecked'}
          onPress={() => setWTB(!wtb)}
        />
        <Text>Willing to Buy (WTB)</Text>
      </View>

      <View style={globalStyles.buttonContainerBottom}>
        <Button 
            mode="contained" 
            onPress={handleSave} 
            style={globalStyles.button}
            >
            Save Changes
        </Button>
        <Button 
            mode="outlined" 
            onPress={handleDelete} 
            buttonColor="#B00020"
            style={globalStyles.button}
            >
            Delete Photocard
        </Button>
      </View>

      <Text style={globalStyles.status}>{status}</Text>
    </ScrollView>
  );
}
