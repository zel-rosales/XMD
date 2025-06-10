// frontend/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Photocard Binder</Text>
      <Button title="Add New Photocard" onPress={() => navigation.navigate('Add')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  title: {
    fontSize: 22, marginBottom: 20,
  },
});
