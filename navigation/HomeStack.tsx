import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen';
import TermsScreen from '../screens/TermsScreen';
import PolicyScreen from '../screens/PolicyScreen';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor: "#161A1D",
      headerTitleAlign: "center",
      headerStyle: {
        alignItems: "center",
        height: 50,
        borderBottomWidth: 1
      },
      headerTitleStyle: {
        fontSize: 14,
        fontFamily: "SpaceGrotesk-Medium"
      }
    }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Policy' component={PolicyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name='Terms' component={TermsScreen} options={{ title: 'Terms & Conditions' }} />
    </Stack.Navigator>
  )
}