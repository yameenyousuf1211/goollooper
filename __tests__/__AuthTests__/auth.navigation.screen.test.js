// Import necessary dependencies
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SplashScreen from '../../src/screens/auth-screens/login-screens/SplashScreen';

describe('Splash Screen', () => {
  it('should render the splash screen', async () => {
    const navigation = {navigate: jest.fn()};
    const {findByTestId} = render(<SplashScreen navigation={navigation} />);
    // Check if splash screen is rendered
    const splashScreenContainer = await findByTestId('splashScreen');
    expect(splashScreenContainer).toBeTruthy();

    // Check if start button is rendered
    const startButton = await findByTestId('startButton');
    expect(startButton).toBeTruthy();

    // Trigger the onPress event
    fireEvent.press(startButton);

    // Check if navigation.navigate is called with the correct argument
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});

// describe('Login Screen', () => {
//   it('should render the Login screen', async () => {
//     const navigation = {navigate: jest.fn()};
//     const {findByTestId} = render(<LoginScreen navigation={navigation} />);
//     // Check if splash screen is rendered
//     const loginScreen = await findByTestId('loginScreen');
//     expect(loginScreen).toBeTruthy();

//   });
// });

