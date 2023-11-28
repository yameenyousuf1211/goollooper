import React from 'react';
import {Dimensions, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GoogleIcon from '../../../../../assets/icons/GoogleIcon';
import FacebookIcon from '../../../../../assets/icons/FacebookIcon';
import AppleIcon from '../../../../../assets/icons/AppleIcon';

const {width, height} = Dimensions.get('screen');

const SocialMedia = () => {
  return (
    <View style={{paddingVertical: height * 0.046}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 8,
        }}>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#6D6D6D',
            borderWidth: 1,
          }}>
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3B5998',
          }}>
          <FacebookIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
          }}>
          <AppleIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialMedia;
