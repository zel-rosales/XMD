// frontend/App.js
import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import screens
import HomeScreen from './screens/HomeScreen';
import AddPhotocardScreen from './screens/AddPhotocardScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditPhotocardScreen from './screens/EditPhotocardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Add" component={AddPhotocardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Edit Photocard" component={EditPhotocardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}