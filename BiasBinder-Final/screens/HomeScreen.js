// screens/HomeScreen.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// Import MaterialCommunityIcons for consistent icon usage
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PhotoGallery from '../components/PhotoGallery';
import ProfileScreen from './ProfileScreen';

const HomeRoute = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <Appbar.Header>
        <Appbar.Content title="Bias Binder" />
        <Appbar.Action icon="plus" onPress={() => navigation.navigate('Upload')} />
      </Appbar.Header>
      <PhotoGallery />
    </View>
  );
};


const ProfileRoute = () => <ProfileScreen />;

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },  // Home icon
    { key: 'profile', title: 'Profile', icon: 'account' },  // Profile icon
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
      renderIcon={({ route, focused, color }) => (
        <MaterialCommunityIcons
          name={route.icon}
          size={24}
          color={color}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default HomeScreen;
