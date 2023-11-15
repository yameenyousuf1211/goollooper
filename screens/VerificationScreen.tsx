import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {primaryColor, secondaryTextColor} from '../utils/colors';

type Props = {};
const {width, height} = Dimensions.get('screen');

const VerificationScreen = ({navigation}: any) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array());

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleInputBlur = () => {
    setFocusedIndex(null);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key !== 'Backspace' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
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
              <Text style={styles.pageHeading}>Verifications</Text>
            </View>
            <View>
              <Text
                style={{
                  color: secondaryTextColor,
                  fontSize: width * 0.032,
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                Please enter your verification code sent to o our{' '}
              </Text>
              <Text
                style={{
                  color: primaryColor,
                  fontSize: width * 0.032,
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                useremail@gmail.com
              </Text>
            </View>
            <View>
              <View style={styles.inputContainer}>
                {Array.from({length: 6}, (_, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.input,
                      focusedIndex === index && {
                        borderWidth: 1,
                        borderColor: 'white',
                      },
                    ]}
                    maxLength={1}
                    keyboardType="numeric"
                    secureTextEntry={!otp[index]}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={ref => (inputRefs.current[index] = ref)}
                    value={otp[index]}
                    onChangeText={value => handleInputChange(index, value)}
                    onKeyPress={({nativeEvent: {key}}) =>
                      handleInputKeyPress(index, key)
                    }
                    onFocus={() => handleInputFocus(index)}
                    onBlur={handleInputBlur}
                  />
                ))}
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: height * 0.03,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: secondaryTextColor,
                  fontSize: width * 0.032,
                  fontFamily: 'SpaceGrotesk-Regular',
                }}>
                Didn't recieve code?{' '}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: width * 0.032,
                    fontFamily: 'SpaceGrotesk-Regular',
                  }}>
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}>
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
                    Verify Code
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;

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
  inputContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  input: {
    flex: 1,
    height: width * 0.14,
    width: width * 0.14,
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: '#F6F7FB',
    textAlign: 'center',
    color: '#8C8C8C',
  },
});
