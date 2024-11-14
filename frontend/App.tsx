// In App.js in a new project

import * as React from 'react';
import HomeScreen from './components/HomeScreen';
import InstructionsScreen from './components/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './components/CameraScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ title: 'Overview' }}
      />
      <Stack.Screen name='Instructions' component={InstructionsScreen} />
      <Stack.Screen name='Camera Screen' component={CameraScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
