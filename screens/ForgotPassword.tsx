import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {primaryColor, secondaryTextColor} from '../utils/colors';

const {width, height} = Dimensions.get('screen');

const ForgotPassword = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            width: '90%',
            height: '100%',
            paddingVertical: height * 0.024,
            justifyContent: 'space-between',
          }}>
          <View style={{gap: height * 0.038}}>
            <View>
              <Text style={styles.pageHeading}>Forgot Password?</Text>
            </View>
            <View>
              <Text
                style={{
                  color: secondaryTextColor,
                  fontSize: width * 0.038,
                  fontFamily: 'SpaceGrotesk-Medium',
                }}>
                Email Address
              </Text>
              <TextInput
                placeholder="Type here"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#EDEDED',
                  paddingVertical: 10,
                  color: 'rgb(22, 26, 29)',
                  fontFamily: 'SpaceGrotesk-Medium',
                  fontSize: width * 0.038,
                }}
              />
            </View>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Verification')}>
              <View
                style={{
                  backgroundColor: primaryColor,
                  width: '100%',
                  height: 40,
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    textAlign: 'center',
                    fontFamily: 'SpaceGrotesk-Regular',
                    fontSize: width * 0.038,
                  }}>
                  Verify Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  pageHeading: {
    color: secondaryTextColor,
    fontSize: width * 0.048,
    fontFamily: 'SpaceGrotesk-Medium',
  },
});
