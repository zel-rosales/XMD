import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import PhotoGallery from '../components/PhotoGallery';
import ProfileScreen from './ProfileScreen';

const HomeRoute = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [refreshFlag, setRefreshFlag] = useState(false);
  const { refresh } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      if (refresh) {
        setRefreshFlag(prev => !prev);
        navigation.setParams({ refresh: false });
      }
    }, [refresh])
  );

  return (
    <View style={styles.content}>
      <Appbar.Header>
        <Appbar.Content title="Bias Binder" />
        <Appbar.Action icon="plus" onPress={() => navigation.navigate('Upload')} />
      </Appbar.Header>
      <PhotoGallery refreshFlag={refreshFlag} />
    </View>
  );
};

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
