import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Import context
import { PhotocardProvider } from './components/PhotocardContext';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ViewingScreen from './screens/ViewingScreen';

const Stack = createNativeStackNavigator();

const BiasBinder = () => {
  return (
    <PaperProvider>
      <PhotocardProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Viewing" component={ViewingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PhotocardProvider>
    </PaperProvider>
  );
};

export default BiasBinder;
