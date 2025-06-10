// frontend/screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import globalStyles from '../StyleSheet';

export default function HomeScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Your Photocard Binder</Text>
    </View>
  );
}
