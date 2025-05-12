// screens/ViewingScreen.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Appbar } from 'react-native-paper';

const ViewingScreen = ({ route, navigation }) => {
  const { photocard } = route.params;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Photocard Details" />
      </Appbar.Header>
      <View style={styles.container}>
        <Image source={photocard.image} style={styles.image} />
        <Text variant="titleLarge" style={styles.title}>{photocard.name}</Text>
        {/* Add more details here later */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default ViewingScreen;
