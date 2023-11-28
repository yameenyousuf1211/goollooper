import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type AuthStackParamList = {
  CreateProfileScreen: any;
  VolunteerScreen: any;
  GenderScreen: any;
  Policy: any;
  Terms: any;
  Login: any;
};

export type CreateProfileScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CreateProfileScreen'
>;
export type VolunteerScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'VolunteerScreen',
  'GenderScreen'
>;

export type PolicyNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Policy' | 'Terms' | 'Login'
>;
