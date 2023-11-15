import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import Toast from 'react-native-toast-message';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {verifyCode} from '../../../api/auth-module';
import {setAccessToken} from '../../../redux/authSlice';

const ForgetPasswordOtp = ({navigation, route}: any) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array());
  const accountType = useSelector((state: RootState) => state.auth.accountType);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [verificationType, setVerificationType] = useState('');
  const dispatch = useDispatch();

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleInputFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleInputBlur = () => {
    setFocusedIndex(null);
  };

  const [secondsRemaining, setSecondsRemaining] = useState(60);
  useEffect(() => {
    if (route.params.phone) {
      setVerificationType('phone');
      setPhone(route.params.phone);
    }
    if (accountType === 'signup') {
      setEmail(userData?.email);
      setPhone(userData?.phone);
    } else {
      if (route?.params?.verificationType === 'phone') {
        setPhone(route.params.phone);
        setEmail('');
      } else {
        setEmail(route?.params?.email);
        setPhone('');
      }
    }
    setGeneratedOtp(route?.params?.otp);
  }, [route?.params?.verificationType]);

  const handleSubmit = async () => {
    const concatenatedString = otp.join('');
    const convertOtpIntoNumber = parseInt(concatenatedString);
    setIsLoading(true);
    try {
      const response = await verifyCode(convertOtpIntoNumber);
      const data = response?.data.data;
      dispatch(setAccessToken(data.accessToken));
      setSecondsRemaining(0);
      navigation.navigate('BlankButtonRender', {isLoading: isLoading});
   
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `${error?.response.data.message}`,
      });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (secondsRemaining == 0) {
      return;
    }
    let interval = setInterval(() => {
      setSecondsRemaining(secondsRemaining => {
        secondsRemaining <= 1 && clearInterval(interval);
        return secondsRemaining - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

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
    <View style={STYLES.container}>
      <View style={{flex: 1}}>
        <View style={{gap: 10, marginVertical: 0}}>
          <Text style={{fontWeight: '500', fontSize: 22, color: '#fff'}}>
            {route.params.phone ? 'Verify your phone' : 'Verify your email'}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '400', color: '#fff'}}>
            We sent you the verification code
          </Text>
          <Text style={[STYLES.text12, {fontWeight: '400'}]}>
            Verification code is :{' '}
            <Text style={[STYLES.text14, {fontWeight: '500'}]}>
              {generatedOtp}
            </Text>
          </Text>
        </View>
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
      <View style={styles.bottomContainer}>
        <View style={{alignItems: 'center'}}>
          {secondsRemaining !== 0 ? (
            <Text style={STYLES.text14}>
              <Text style={{color: '#268CAA'}}>Resend</Text> in
              <Text style={{color: 'red'}}>{` 00:${secondsRemaining}`}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={() => console.log('Something')}>
              <Text
                style={{
                  color: '#209BCC',
                  textDecorationLine: 'underline',
                }}>
                {isResendLoading ? <CustomLoader /> : 'Resend'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.verifyButtonContainer,
            {
              backgroundColor: otp.length > 0 ? '#209BCC' : 'transparent',
              borderWidth: otp.length > 0 ? 0 : 1,
              borderColor: 'white',
              width: '100%',
            },
          ]}
          disabled={otp.length === 0 || secondsRemaining === 0 || isLoading}
          onPress={handleSubmit}>
          <Text
            style={[
              styles.verifyButtonText,
              {color: otp.length > 0 ? 'white' : 'gray'},
            ]}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgetPasswordOtp;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginVertical: verticalScale(50),
    flexDirection: 'row',
    gap: 4,
  },
  input: {
    flex: 1,
    height: verticalScale(50),
    width: horizontalScale(55),
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'black',
    textAlign: 'center',
    color: '#fff',
  },
  bottomContainer: {
    paddingHorizontal: horizontalScale(10),
    paddingBottom: verticalScale(16),
    alignItems: 'center',
  },
  verifyButtonContainer: {
    borderRadius: 25,
    paddingVertical: verticalScale(17),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  verifyButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});