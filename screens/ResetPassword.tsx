import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {primaryColor, secondaryTextColor} from '../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');
type Props = {};

const ResetPassword = ({navigation}: any) => {
  const [hidePassword, setHidePassword] = useState(true);
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
              <Text style={styles.pageHeading}>Reset Password</Text>
            </View>
            <View>
              <Text
                style={{
                  color: secondaryTextColor,
                  fontSize: width * 0.038,
                  fontFamily: 'SpaceGrotesk-Medium',
                }}>
                New Password
              </Text>
              <View>
                <TextInput
                  placeholder="Type here"
                  secureTextEntry={hidePassword}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#EDEDED',
                    paddingVertical: 10,
                    color: 'rgb(22, 26, 29)',
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.038,
                  }}
                />
                {/* <TouchableOpacity style={{position: 'absolute', right: 0}}> */}
                <Icon name="eye" color="#CDCDCF" size={18} />
                {/* </TouchableOpacity> */}
              </View>
            </View>
            <View>
              <Text
                style={{
                  color: secondaryTextColor,
                  fontSize: width * 0.038,
                  fontFamily: 'SpaceGrotesk-Medium',
                }}>
                Re-Type Password
              </Text>
              <View>
                <TextInput
                  placeholder="Type here"
                  secureTextEntry={hidePassword}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#EDEDED',
                    paddingVertical: 10,
                    color: 'rgb(22, 26, 29)',
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.038,
                  }}
                />
                {/* <TouchableOpacity style={{position: 'absolute', right: 0}}> */}
                <Icon name="play" color="#CDCDCF" size={18} />
                {/* </TouchableOpacity> */}
              </View>
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
                  Reset Password
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

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
