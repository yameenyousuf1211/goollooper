import {StyleSheet} from 'react-native';
import {secondaryTextColor} from '../utils/colors';
export const globalStlyes = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  pageHeading: {
    color: secondaryTextColor,
    fontSize: 18,
    fontFamily: 'SpaceGrotesk-Medium',
  },
  text16: {
    color: '#161A1D',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Medium',
  },
  text12: {
    
    color: 'rgba(22, 26, 29, 0.65)',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'SpaceGrotesk-Regular',
  },
  text14: {
    color: '#161A1D',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'SpaceGrotesk-Medium',
  },
});
