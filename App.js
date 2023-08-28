import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthenticationScreen from './src/screens/AuthenticationScreen';
import HomeScreen from '././src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Authentication'>
        <Stack.Screen name='Authentication' component={AuthenticationScreen} />
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerLeft: null,
            title: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
