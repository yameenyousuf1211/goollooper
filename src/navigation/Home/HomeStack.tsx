import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../../screens/dashboard-screens';
import SPProfile from '../../screens/dashboard-screens/SPProfile';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#161A1D',
        headerTitleAlign: 'center',
        // headerShadowVisible: false,
        headerStyle: {
          height: 75,
          borderBottomWidth: 1,
          borderBottomColor: '#EDEDED',
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'SpaceGrotesk-Medium',
        },
      }}
      initialRouteName="Splash">
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="SPProfile"
        component={SPProfile}
        options={{
          title: 'Service Provider’s Profile',
        }}
      />
    </Stack.Navigator>
  );
};
