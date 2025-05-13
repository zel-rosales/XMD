// screens/HomeScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';

import PhotoGallery from '../components/PhotoGallery';
import ProfileScreen from './ProfileScreen';

const HomeRoute = () => (
  <View style={styles.content}>
    <Appbar.Header>
      <Appbar.Content title="Bias Binder" />
    </Appbar.Header>
    <PhotoGallery />
  </View>
);

const ProfileRoute = () => <ProfileScreen />;

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'profile', title: 'Profile', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default HomeScreen;
