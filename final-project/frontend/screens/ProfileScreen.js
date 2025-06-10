// frontend/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import globalStyles from '../StyleSheet';

export default function ProfileScreen() {
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
    <View style={globalStyles.container}>

      <View style={globalStyles.content}>
        {isEditing ? (
          <>
            <Text style={globalStyles.header}>My Info</Text>
            <TextInput
              label="Name"
              placeholder="Name"
              value={name}
              onChangeText={setName}
              error={!!errors.name}
              style={globalStyles.input}
            />
            {errors.name && <Text style={globalStyles.errorText}>{errors.name}</Text>}

            <TextInput
              label="Favorite Artist"
              placeholder="Favorite Artist"
              value={artist}
              onChangeText={setArtist}
              error={!!errors.artist}
              style={globalStyles.input}
            />
            {errors.artist && <Text style={globalStyles.errorText}>{errors.artist}</Text>}

            <TextInput
              label="Ult Bias"
              placeholder="Ult Bias"
              value={ultBias}
              onChangeText={setUltBias}
              error={!!errors.ultBias}
              style={globalStyles.input}
            />
            {errors.ultBias && <Text style={globalStyles.errorText}>{errors.ultBias}</Text>}

            <Text style={globalStyles.sectionLabel}>I am a...</Text>
            {['collector', 'trader', 'seller'].map((role) => (
              <View key={role} style={globalStyles.checkboxRow}>
                <Checkbox
                  status={roles[role] ? 'checked' : 'unchecked'}
                  onPress={() => toggleRole(role)}
                />
                <Text>{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
              </View>
            ))}
            {errors.roles && <Text style={globalStyles.errorText}>{errors.roles}</Text>}
          </>
        ) : (
          <>
            <Text style={globalStyles.header}>My Info</Text>
            <Text style={globalStyles.savedText}>Name: {name}</Text>
            <Text style={globalStyles.savedText}>Favorite Artist: {artist}</Text>
            <Text style={globalStyles.savedText}>Ult Bias: {ultBias}</Text>
            <Text style={globalStyles.sectionLabel}>I am a...</Text>
            {Object.keys(roles).map(
              (role) => roles[role] && <Text key={role} style={globalStyles.savedText}>{role}</Text>
            )}
          </>
        )}
      </View>
      
      <View style={globalStyles.buttonContainerBottom}>
        {isEditing ? (
          <>
            <Button 
              mode="contained" 
              onPress={handleSave} 
              style={globalStyles.button}
              >
                Save
            </Button>
            <Button 
              mode="outlined" 
              onPress={handleCancel} 
              style={globalStyles.button}
              >
                Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              mode="outlined" 
              onPress={handleEdit} 
              style={globalStyles.button}
              >
                Edit
            </Button>
            <Button 
              mode="text" 
              onPress={handleClear} 
              style={globalStyles.button}
              >
                Clear
            </Button>
          </>
        )}
      </View>
    </View>
  );
};
