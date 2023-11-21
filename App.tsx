import React from 'react';
import {StyleSheet} from 'react-native';
import {Routes} from './src/navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import Toast from 'react-native-toast-message';
import SplashScreen from './src/screens/auth-screens/login-screens/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';

let persistor = persistStore(store);

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <NavigationContainer>
        {/* <StatusBar
        barStyle='dark-content'
        backgroundColor={'transparent'}
        // translucent
      />  */}
        <Routes />
      </NavigationContainer>
      <Toast />

      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
