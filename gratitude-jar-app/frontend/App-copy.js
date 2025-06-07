// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AddGratitude from './screens/AddGratitude';
import ViewGratitude from './screens/ViewGratitude';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Add Gratitude') {
              iconName = 'add-circle-outline';
            } else if (route.name === 'View Gratitude') {
              iconName = 'book-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Add Gratitude" component={AddGratitude} />
        <Tab.Screen name="View Gratitude" component={ViewGratitude} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
