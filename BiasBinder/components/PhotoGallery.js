// components/PhotoGallery.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PhotoGallery = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>[Photocard Gallery Placeholder]</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default PhotoGallery;
