import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import {primaryColor, secondaryTextColor} from '../../../utils/colors';
import CustomModal from '../../../components/modals/CustomBottomModal';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {setAccessToken} from '../../../redux/AuthSlice';
import {getOtpCode, verifyCode} from '../../../api';
import useLoading from '../../../hooks/useLoading';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/reuseable-components/CustomLoader';
import {useDispatch} from 'react-redux';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {useFocusEffect} from '@react-navigation/native';

type Props = {};
const {width, height} = Dimensions.get('screen');

const VerificationScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {isLoading, startLoading, stopLoading} = useLoading();
  const [secondsRemaining, setSecondsRemaining] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array());
  const [isModal, setIsModal] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [newOtp, setNewOtp] = useState<string>('');


  useEffect(() => {
    if (secondsRemaining == 0) {
      return;
    }
    let interval = setInterval(() => {
      setSecondsRemaining(secondsRemaining => {
        secondsRemaining <= 1 && clearInterval(interval);
        return secondsRemaining - 1;
        otp;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
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

  const resendOtp = async () => {
    try {
      const response = await getOtpCode({email: route?.params?.email});
      const data = response?.data.data;
      setNewOtp(data?.code);
      setSecondsRemaining(60);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
        console.log(error.response, 'error');
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
        });
      }
    }
  };

  const handleSubmit = async () => {
    const concatenatedString = otp.join('');
    const convertOtpIntoNumber = parseInt(concatenatedString);
    startLoading();
    try {
      const response = await verifyCode(convertOtpIntoNumber);
      const data = response?.data.data;
      dispatch(setAccessToken(data.accessToken));
      if (route?.params?.isCreateProfile) {
        navigation.navigate('ContactPermissionScreen');
      } else {
        navigation.navigate('ResetPassword');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `${error?.response.data.message}`,
      });
    }
    stopLoading();
  };
  return (
    <SafeAreaView>
      {isModal ? (
        <CustomModal
          title="Account Created"
          text="Congratulations! Your account has been created successfully.
         Please proceed to profile creation."
          buttonText="Set Up Profile"
          route="CreateProfileScreen"
        />
      ) : (
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
                <Text style={styles.pageHeading}>Verification</Text>
              </View>
              <View>
                <Text
                  style={{
                    color: secondaryTextColor,
                    fontSize: width * 0.032,
                    fontFamily: 'SpaceGrotesk-Regular',
                  }}>
                  Please enter your verification code sent to your{' '}
                </Text>
                <Text
                  style={{
                    color: primaryColor,
                    fontSize: width * 0.032,
                    fontFamily: 'SpaceGrotesk-Regular',
                  }}>
                  {route?.params?.email}
                </Text>
                {route?.params?.otp && newOtp === '' ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: primaryColor,
                      fontSize: width * 0.032,
                      fontFamily: 'SpaceGrotesk-Regular',
                    }}>
                    <Text
                      style={{
                        color: secondaryTextColor,
                        fontSize: width * 0.032,
                        fontFamily: 'SpaceGrotesk-Regular',
                      }}>
                      {' '}
                      Your otp code is:{' '}
                    </Text>{' '}
                    {newOtp !== '' ? newOtp : route?.params?.otp}
                  </Text>
                ) : newOtp !== '' ? (
                  <Text
                    style={{
                      marginTop: 5,
                      color: primaryColor,
                      fontSize: width * 0.032,
                      fontFamily: 'SpaceGrotesk-Regular',
                    }}>
                    <Text
                      style={{
                        color: secondaryTextColor,
                        fontSize: width * 0.032,
                        fontFamily: 'SpaceGrotesk-Regular',
                      }}>
                      {' '}
                      Your otp code is:{' '}
                    </Text>{' '}
                    {newOtp}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                {Array.from({length: 6}, (_, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.input,
                      focusedIndex === index && styles.focusedInput,
                    ]}
                    maxLength={1}
                    keyboardType="numeric"
                    secureTextEntry={!otp[index]}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    ref={ref => (inputRefs.current[index] = ref)}
                    value={otp[index]}
                    onFocus={() => handleInputFocus(index)}
                    onChangeText={value => handleInputChange(index, value)}
                    onKeyPress={({nativeEvent: {key}}) =>
                      handleInputKeyPress(index, key)
                    }
                  />
                ))}
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
                  Didn't receive code?{' '}
                </Text>
                <TouchableOpacity
                  onPress={resendOtp}
                  disabled={secondsRemaining !== 0}
                  activeOpacity={secondsRemaining === 0 ? 0 : 1}>
                  <Text
                    style={{
                      color:
                        secondsRemaining === 0
                          ? primaryColor
                          : 'rgba(162, 160, 168, 1)',
                      fontSize: width * 0.032,
                      fontFamily: 'SpaceGrotesk-Regular',
                    }}>
                    Resend{' '}
                    <Text style={{color: primaryColor}}>
                      {secondsRemaining != 0 && `in 00:${secondsRemaining}`}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%'}}>
                <CustomButton
                  isDisabled={
                    otp.some(value => !value) || otp.length < 6 || isLoading
                  }
                  onPress={handleSubmit}>
                  {isLoading ? <CustomLoader /> : 'Verify Code'}
                </CustomButton>
              </View>
            </View>
          </View>
        </View>
      )}
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
  focusedInput: {
    borderColor: primaryColor,
    borderWidth: 2,
  },
});
