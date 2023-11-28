import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import * as validationFunctions from './validation.functions';
import {act} from 'react-test-renderer'; // Import act from react-test-renderer
import LoginScreen from '../../src/screens/auth-screens/login-screens/LoginScreen';

// Mock the navigation functions
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('Login Screen', () => {
  it('should navigate to the Dashboard screen on valid email and password', async () => {
    // Mock the validation functions
    jest.spyOn(validationFunctions, 'validateEmail').mockReturnValue(true);
    jest.spyOn(validationFunctions, 'validatePassword').mockReturnValue(true);

    const {getByTestId, getByText} = render(<LoginScreen />);
    const emailInput = getByTestId('loginEmail'); // Replace with the actual test ID
    const passwordInput = getByTestId('loginPassword'); // Replace with the actual test ID
    const validateButton = getByText('Sign In'); // Replace with the actual button text

    // Set valid email and password
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    await act(async () => {
      // Trigger button click
      fireEvent.press(validateButton);
    });

    // Expect the navigation function to be called with the correct screen name
    expect(mockNavigate).toHaveBeenCalledWith('DashboardScreen'); // Replace with the actual screen name
  });
});
