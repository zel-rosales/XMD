import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = () => {
  // State variables for user input and editing mode
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [ultBias, setUltBias] = useState('');
  const [roles, setRoles] = useState({ collector: false, trader: false, seller: false });
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});

  // Load saved data when the screen mounts
  useEffect(() => {
    (async () => {
      const savedName = await SecureStore.getItemAsync('name');
      const savedArtist = await SecureStore.getItemAsync('artist');
      const savedUltBias = await SecureStore.getItemAsync('ultBias');
      const savedRoles = await SecureStore.getItemAsync('roles');

      if (savedName) setName(savedName);
      if (savedArtist) setArtist(savedArtist);
      if (savedUltBias) setUltBias(savedUltBias);
      if (savedRoles) setRoles(JSON.parse(savedRoles));

      // Exit editing mode if any saved data exists
      if (savedName || savedArtist || savedUltBias || savedRoles) {
        setIsEditing(false);
      }
    })();
  }, []);

  // Handle role checkbox toggles
  const toggleRole = (role) => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  // Save input data to SecureStore with error checking
  const handleSave = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!artist.trim()) newErrors.artist = 'Favorite artist is required';
    if (!ultBias.trim()) newErrors.ultBias = 'Ult bias is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await SecureStore.setItemAsync('name', name);
    await SecureStore.setItemAsync('artist', artist);
    await SecureStore.setItemAsync('ultBias', ultBias);
    await SecureStore.setItemAsync('roles', JSON.stringify(roles));
    setIsEditing(false);
    setErrors({});
  };

  // Enable editing mode
  const handleEdit = () => setIsEditing(true);

  // Clear all data from SecureStore and reset state
  const handleClear = async () => {
    await SecureStore.deleteItemAsync('name');
    await SecureStore.deleteItemAsync('artist');
    await SecureStore.deleteItemAsync('ultBias');
    await SecureStore.deleteItemAsync('roles');

    setName('');
    setArtist('');
    setUltBias('');
    setRoles({ collector: false, trader: false, seller: false });
    setIsEditing(true);
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {isEditing ? (
        <>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            error={!!errors.name}
            style={styles.input}
          />
          <TextInput
            label="Favorite Artist"
            value={artist}
            onChangeText={setArtist}
            error={!!errors.artist}
            style={styles.input}
          />
          <TextInput
            label="Ult Bias"
            value={ultBias}
            onChangeText={setUltBias}
            error={!!errors.ultBias}
            style={styles.input}
          />

          <Text style={styles.sectionLabel}>I am a...</Text>
          {['collector', 'trader', 'seller'].map((role) => (
            <View key={role} style={styles.checkboxRow}>
              <Checkbox
                status={roles[role] ? 'checked' : 'unchecked'}
                onPress={() => toggleRole(role)}
              />
              <Text>{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
            </View>
          ))}

          <Button mode="contained" onPress={handleSave} style={styles.button}>Save</Button>
        </>
      ) : (
        <>
          <Text style={styles.savedText}>Name: {name}</Text>
          <Text style={styles.savedText}>Favorite Artist: {artist}</Text>
          <Text style={styles.savedText}>Ult Bias: {ultBias}</Text>

          <Text style={styles.sectionLabel}>I am a...</Text>
          {Object.keys(roles).map((role) =>
            roles[role] ? <Text key={role} style={styles.savedText}>{role}</Text> : null
          )}

          <Button mode="outlined" onPress={handleEdit} style={styles.button}>Edit</Button>
          <Button mode="text" onPress={handleClear} style={styles.button}>Clear</Button>
        </>
      )}

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  savedText: {
    fontSize: 16,
    marginVertical: 4,
  },
  button: {
    marginTop: 10,
  },
});

export default ProfileScreen;
