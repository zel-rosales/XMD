import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddGratitude from './screens/AddGratitude';
import ViewGratitude from './screens/ViewGratitude';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Add Gratitude" component={AddGratitude} />
        <Stack.Screen name="View Entries" component={ViewGratitude} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}