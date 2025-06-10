// frontend/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [artist, setArtist] = useState('');
  const [ultBias, setUltBias] = useState('');
  const [roles, setRoles] = useState({ collector: false, trader: false, seller: false });
  const [isEditing, setIsEditing] = useState(true);
  const [errors, setErrors] = useState({});

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

      if (savedName || savedArtist || savedUltBias || savedRoles) {
        setIsEditing(false);
      }
    })();
  }, []);

  const toggleRole = (role) => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!artist.trim()) newErrors.artist = 'Favorite artist is required';
    if (!ultBias.trim()) newErrors.ultBias = 'Ult bias is required';

    const hasRole = Object.values(roles).some((value) => value);
    if (!hasRole) newErrors.roles = 'At least one role must be selected';

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await SecureStore.setItemAsync('name', name);
    await SecureStore.setItemAsync('artist', artist);
    await SecureStore.setItemAsync('ultBias', ultBias);
    await SecureStore.setItemAsync('roles', JSON.stringify(roles));

    setIsEditing(false);
    setErrors({});
  };

  const handleEdit = () => setIsEditing(true);

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

  const handleCancel = async () => {
    setIsEditing(false);
    const savedName = await SecureStore.getItemAsync('name');
    const savedArtist = await SecureStore.getItemAsync('artist');
    const savedUltBias = await SecureStore.getItemAsync('ultBias');
    const savedRoles = await SecureStore.getItemAsync('roles');

    if (savedName) setName(savedName);
    if (savedArtist) setArtist(savedArtist);
    if (savedUltBias) setUltBias(savedUltBias);
    if (savedRoles) setRoles(JSON.parse(savedRoles));
  };

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        {isEditing ? (
          <>
            <Text style={styles.sectionLabel}>My Info</Text>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              error={!!errors.name}
              style={styles.input}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              label="Favorite Artist"
              value={artist}
              onChangeText={setArtist}
              error={!!errors.artist}
              style={styles.input}
            />
            {errors.artist && <Text style={styles.errorText}>{errors.artist}</Text>}

            <TextInput
              label="Ult Bias"
              value={ultBias}
              onChangeText={setUltBias}
              error={!!errors.ultBias}
              style={styles.input}
            />
            {errors.ultBias && <Text style={styles.errorText}>{errors.ultBias}</Text>}

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
            {errors.roles && <Text style={styles.errorText}>{errors.roles}</Text>}
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>My Info</Text>
            <Text style={styles.text}>Name: {name}</Text>
            <Text style={styles.text}>Favorite Artist: {artist}</Text>
            <Text style={styles.text}>Ult Bias: {ultBias}</Text>
            <Text style={styles.sectionLabel}>I am a...</Text>
            {Object.keys(roles).map(
              (role) => roles[role] && <Text key={role} style={styles.text}>{role}</Text>
            )}
          </>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <Button mode="contained" onPress={handleSave} style={styles.button}>Save</Button>
            <Button mode="outlined" onPress={handleCancel} style={styles.button}>Cancel</Button>
          </>
        ) : (
          <>
            <Button mode="outlined" onPress={handleEdit} style={styles.button}>Edit</Button>
            <Button mode="text" onPress={handleClear} style={styles.button}>Clear</Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 12,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  savedText: {
    fontSize: 16,
    marginVertical: 4,
  },
  text: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonContainer: {
    padding: 16,
    // backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
  },
});

export default ProfileScreen;
