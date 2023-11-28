import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, secondaryTextColor} from '../../../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import { PolicyNavigationProp } from '../../../../interfaces/navigation.interface';

const {width, height} = Dimensions.get('screen');

interface Props {
  text: string;
}

const PrivacyPolicyText = ({text}: Props) => {
  const navigation = useNavigation<PolicyNavigationProp>();
  return (
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#161A1D',
              fontFamily: 'SpaceGrotesk-Regular',
              fontSize: 12,
            }}>
            {text}, you agree to our
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
              <Text
                style={{
                  color: primaryColor,
                  fontFamily: 'SpaceGrotesk-Regular',
                  fontSize: 12,
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
            <Text style={{
                    color: '#161A1D',
                    fontFamily: 'SpaceGrotesk-Regular',
                    fontSize: 12,
                }}> and </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text
                style={{
                  color: primaryColor,
                  fontFamily: 'SpaceGrotesk-Regular',
                  fontSize: 12,
                }}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    
  );
};

export default PrivacyPolicyText;
