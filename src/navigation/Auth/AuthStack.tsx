import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../screens/auth-screens/login-screens/SplashScreen';
import LoginScreen from '../../screens/auth-screens/login-screens/LoginScreen';
import TermsScreen from '../../screens/auth-screens/login-screens/TermsScreen';
import PolicyScreen from '../../screens/auth-screens/login-screens/PolicyScreen';
import ForgotPassword from '../../screens/auth-screens/login-screens/ForgotPassword';
import VerificationScreen from '../../screens/auth-screens/login-screens/VerificationScreen';
import ResetPassword from '../../screens/auth-screens/login-screens/ResetPassword';
import CreateAccountScreen from '../../screens/auth-screens/create-account-screens/CreateAccountScreen';
import CreateProfileScreen from '../../screens/auth-screens/create-account-screens/CreateProfileScreen';
import VolunteerScreen from '../../screens/auth-screens/create-account-screens/VolunteerScreen';
import GenderScreen from '../../screens/auth-screens/create-account-screens/GenderScreen';
import SubscriptionScreen from '../../screens/auth-screens/subscription-screens/SubscriptionScreen';
import MBSSubscription from '../../screens/auth-screens/subscription-screens/MBSSubscription';
import BSPSubscription from '../../screens/auth-screens/subscription-screens/BSPSubscription';
import BSLSubscription from '../../screens/auth-screens/subscription-screens/BSLSubscription';
import SPSpeciality from '../../screens/auth-screens/create-account-screens/SPSpeciality';
import StateScreen from '../../screens/auth-screens/create-account-screens/map-screens/StateScreen';
import CityScreen from '../../screens/auth-screens/create-account-screens/map-screens/CityScreen';
import CountryScreen from '../../screens/auth-screens/create-account-screens/map-screens/CountryScreen';
import ZipcodeScreen from '../../screens/auth-screens/create-account-screens/map-screens/ZipcodeScreen';
import ScheduleScreen from '../../screens/auth-screens/create-account-screens/schedule-screens';
import SetScheduleScreen from '../../screens/auth-screens/create-account-screens/schedule-screens/SetScheduleScreen';
import SettimeScreen from '../../screens/auth-screens/create-account-screens/schedule-screens/SettimeScreen';
import MapScreen from '../../screens/auth-screens/create-account-screens/map-screens/MapScreen';
import DashboardScreen from '../../screens/dashboard-screens';
import ContactPermissionScreen from '../../screens/auth-screens/create-account-screens/ContactPermissionScreen';

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#161A1D',
        headerTitleAlign: 'center',
        // headerShadowVisible: false,
        headerStyle: {
          height: 65,
          borderBottomWidth: 1,
          borderBottomColor: '#EDEDED',
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'SpaceGrotesk-Medium',
        },
      }}
      initialRouteName="MapScreen">
      {/* //  initialRouteName="ScheduleScreen">  */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Policy"
        component={PolicyScreen}
        options={{title: 'Privacy Policy'}}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{title: 'Terms & Conditions'}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{title: ''}}
      />
      <Stack.Screen
        name="Verification"
        component={VerificationScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{title: ''}}
      />

      {/* // create account screens */}
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ContactPermissionScreen"
        component={ContactPermissionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateProfileScreen"
        component={CreateProfileScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="GenderScreen"
        component={GenderScreen}
        options={{title: 'Gender'}}
      />
      <Stack.Screen
        name="VolunteerScreen"
        component={VolunteerScreen}
        options={{title: 'Volunteer'}}
      />
      <Stack.Screen
        name="SPSpeciality"
        component={SPSpeciality}
        options={{title: 'Service Provider’s  Speciality'}}
      />

      {/* // subscription and booost screens */}

      <Stack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="BSP"
        component={BSPSubscription}
        options={{title: ''}}
      />
      <Stack.Screen
        name="MBS"
        component={MBSSubscription}
        options={{title: ''}}
      />
      <Stack.Screen
        name="BSL"
        component={BSLSubscription}
        options={{title: ''}}
      />

      {/* map screens */}
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{title: 'Set Location'}}
      />
      <Stack.Screen
        name="StateScreen"
        component={StateScreen}
        options={{title: 'State'}}
      />
      <Stack.Screen
        name="CityScreen"
        component={CityScreen}
        options={{title: 'City'}}
      />
      <Stack.Screen
        name="CountryScreen"
        component={CountryScreen}
        options={{title: 'County'}}
      />
      <Stack.Screen
        name="ZipcodeScreen"
        component={ZipcodeScreen}
        options={{title: 'ZIP Code'}}
      />

      {/* //schedule screens */}
      <Stack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{title: 'Set Schedule'}}
      />
      <Stack.Screen
        name="SetScheduleScreen"
        component={SetScheduleScreen}
        options={{title: 'Set Schedule'}}
      />
      <Stack.Screen
        name="SettimeScreen"
        component={SettimeScreen}
        options={{title: 'Set Time'}}
      />
    </Stack.Navigator>
  );
};
