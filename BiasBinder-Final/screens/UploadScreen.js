import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Checkbox, RadioButton, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const UploadScreen = () => {
  const navigation = useNavigation();

  const [imageUrl, setImageUrl] = useState('');
  const [label, setLabel] = useState('');
  const [artist, setArtist] = useState('');
  const [member, setMember] = useState('');
  const [album, setAlbum] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [status, setStatus] = useState('');
  const [sell, setSell] = useState(false);
  const [trade, setTrade] = useState(false);
  const [buy, setBuy] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!label.trim()) newErrors.label = 'Label is required';
    if (!artist.trim()) newErrors.artist = 'Artist is required';
    if (!member.trim()) newErrors.member = 'Member is required';
    if (!album.trim()) newErrors.album = 'Album/Set is required';
    if (!status) newErrors.status = 'Please select Owned or ISO';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const params = new URLSearchParams({
      imageUrl,
      label,
      artist,
      member,
      album,
      favorite: favorite ? '1' : '0',
      status,
      sell: sell ? '1' : '0',
      trade: trade ? '1' : '0',
      buy: buy ? '1' : '0',
    });

    const url = `https://your-server.com/upload.php?${params.toString()}`;

    fetch(url)
      .then(response => response.text())
      .then(data => {
        console.log('Upload success:', data);
        navigation.goBack();
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Image URL (optional)"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />

      <TextInput
        label="Label *"
        value={label}
        onChangeText={setLabel}
        style={styles.input}
        error={!!errors.label}
      />
      {errors.label && <Text style={styles.error}>{errors.label}</Text>}

      <TextInput
        label="Artist *"
        value={artist}
        onChangeText={setArtist}
        style={styles.input}
        error={!!errors.artist}
      />
      {errors.artist && <Text style={styles.error}>{errors.artist}</Text>}

      <TextInput
        label="Member *"
        value={member}
        onChangeText={setMember}
        style={styles.input}
        error={!!errors.member}
      />
      {errors.member && <Text style={styles.error}>{errors.member}</Text>}

      <TextInput
        label="Album/Set *"
        value={album}
        onChangeText={setAlbum}
        style={styles.input}
        error={!!errors.album}
      />
      {errors.album && <Text style={styles.error}>{errors.album}</Text>}

      <View style={styles.row}>
        <Text style={{ marginRight: 8 }}>Favorite</Text>
        <IconButton
          icon={favorite ? 'heart' : 'heart-outline'}
          iconColor={favorite ? 'red' : 'gray'}
          size={24}
          onPress={() => setFavorite(!favorite)}
        />
      </View>

      <Text>Status *</Text>
      <RadioButton.Group onValueChange={setStatus} value={status}>
        <View style={styles.row}>
          <RadioButton value="owned" />
          <Text>Owned</Text>
        </View>
        <View style={styles.row}>
          <RadioButton value="iso" />
          <Text>ISO</Text>
        </View>
      </RadioButton.Group>
      {errors.status && <Text style={styles.error}>{errors.status}</Text>}

      <Text>Willing to:</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox.Item label="Sell" status={sell ? 'checked' : 'unchecked'} onPress={() => setSell(!sell)} />
        <Checkbox.Item label="Trade" status={trade ? 'checked' : 'unchecked'} onPress={() => setTrade(!trade)} />
        <Checkbox.Item label="Buy" status={buy ? 'checked' : 'unchecked'} onPress={() => setBuy(!buy)} />
      </View>

      <Button mode="contained" onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>

      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
        Cancel
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  checkboxGroup: {
    marginTop: 8,
  },
  button: {
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default UploadScreen;
