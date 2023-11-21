import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {primaryColor, secondaryTextColor} from '../../../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import SocialMedia from '../../../components/auth-components/login-components/SocialMedia';
import PrivacyPolicyText from '../../../components/auth-components/login-components/PrivacyPolicyText';
import CustomInput from '../../../components/reuseable-components/CustomInput';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {Formik} from 'formik';
import {loginSchema} from '../../../validations';
import {login} from '../../../api';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  setAccessToken,
  setAuthentication,
  setRefreshToken,
} from '../../../redux/AuthSlice';
import CustomLoader from '../../../components/reuseable-components/CustomLoader';
import useLoading from '../../../hooks/useLoading';

const {width, height} = Dimensions.get('screen');

interface FormValues {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {isLoading, startLoading, stopLoading} = useLoading();

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: FormValues) => {
    startLoading();
    const reqData = {
      ...values,
      fcmToken: 'fcmToken123',
    };
    try {
      const response = await login(reqData);
      const data = response?.data.data;
      Toast.show({
        type: 'success',
        text1: `${response?.data.message}`,
      });
      navigation.navigate('DashboardScreen');
      dispatch(setAuthentication(true));
      dispatch(setAccessToken(data?.accessToken));
      dispatch(setRefreshToken(data?.refreshToken));
    } catch (error: any) {
      console.log(error?.response);
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
        });
      }
    }
    stopLoading();
  };
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={{gap: height * 0.032}}>
              <View>
                <Image
                  source={require('../../../../assets/pictorial-logo.png')}
                  style={{width: width * 0.2, height: width * 0.2}}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: primaryColor,
                    fontFamily: 'SpaceGrotesk-Medium',
                    fontSize: width * 0.05,
                  }}>
                  Welcome Back To Goollooper!
                </Text>
              </View>
            </View>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}>
              {({handleChange, handleSubmit, values, errors, touched}) => (
                <View>
                  <View style={styles.inputFieldsContainer}>
                    <CustomInput
                      label="Email Address"
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                      initialTouched={true}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      handleChange={handleChange('email')}
                    />
                    <CustomInput
                      label="Password"
                      value={values.password}
                      error={errors.password}
                      touched={touched.password}
                      initialTouched={true}
                      handleChange={handleChange('password')}
                      isShowPasswordIcon={true}
                    />
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        paddingTop: height * 0.0001,
                      }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text
                          style={{
                            color: '#FF3232',
                            fontSize: width * 0.038,
                            fontFamily: 'SpaceGrotesk-Regular',
                          }}>
                          Forgot password?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{width: '100%', paddingBottom: height * 0.012}}>
                    <CustomButton isDisabled={isLoading} onPress={handleSubmit}>
                      {isLoading ? <CustomLoader /> : 'Sign In'}{' '}
                    </CustomButton>
                  </View>
                </View>
              )}
            </Formik>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: height * 0.026,
              }}>
              <View
                style={{width: '40%', height: 1, backgroundColor: '#EDEDED'}}
              />
              <View>
                <Text>or</Text>
              </View>
              <View
                style={{width: '40%', height: 1, backgroundColor: '#EDEDED'}}
              />
            </View>
            <SocialMedia />
            <View style={{gap: height * 0.046}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: secondaryTextColor,
                      fontFamily: 'SpaceGrotesk-Regular',
                      fontSize: width * 0.032,
                    }}>
                    Don't have account yet?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('CreateAccountScreen')}>
                    <Text
                      style={{
                        color: primaryColor,
                        fontFamily: 'SpaceGrotesk-Regular',
                        fontSize: width * 0.032,
                      }}>
                      CreateAccount
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <PrivacyPolicyText text="By signing in to your account" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(211,211,211)',
    opacity: 0.1,
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },
  contentContainer: {
    width: '90%',
    paddingVertical: height * 0.032,
  },
  logoContainer: {
    // width: "60%"
  },
  sloganContainer: {
    // width: "90%",
    // borderWidth: 1
  },
  slogan: {
    fontSize: 14,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  inputFieldsContainer: {
    paddingVertical: height * 0.056,
    gap: height * 0.01,
  },
});
