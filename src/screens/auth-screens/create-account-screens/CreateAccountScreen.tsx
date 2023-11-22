import React from 'react';
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
import CustomInput from '../../../components/reuseable-components/CustomInput';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import SocialMedia from '../../../components/auth-components/login-components/SocialMedia';
import PrivacyPolicyText from '../../../components/auth-components/login-components/PrivacyPolicyText';
import {Formik} from 'formik';
import {createAccountSchema} from '../../../validations';
import {getOtpCode, register} from '../../../api';
import useLoading from '../../../hooks/useLoading';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/reuseable-components/CustomLoader';
import {setUserData} from '../../../redux/AuthSlice';
import {useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('screen');

interface FormValues {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const CreateAccountScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {isLoading, startLoading, stopLoading} = useLoading();

  const initialValues: FormValues = {
    email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: FormValues) => {
    startLoading();
    const reqData = {
      email: values.email,
      password: values.newPassword,
      role: 'user',
      fcmToken: 'fcmToken123',
    };
    try {
      const response = await register(reqData);
      const data = response?.data.data;
      console.log(data, 'data');
      dispatch(setUserData(data?.user));
      const otpResponse = await getOtpCode({email: values.email});
      const otpData = otpResponse?.data.data;
      Toast.show({
        type: 'success',
        text1: `${response?.data.message}`,
      });
      navigation.navigate('Verification', {
        isCreateProfile: true,
        email: values.email,
        otp: otpData?.code,
      });
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
                  Welcome Back To Goollooper
                </Text>
              </View>
            </View>
            <Formik
              initialValues={initialValues}
              validationSchema={createAccountSchema}
              onSubmit={handleSubmit}>
              {({handleChange, handleSubmit, values, errors, touched}) => (
                <>
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
                      label="Create Password"
                      value={values.newPassword}
                      error={errors.newPassword}
                      touched={touched.newPassword}
                      initialTouched={true}
                      handleChange={handleChange('newPassword')}
                      isShowPasswordIcon={true}
                    />
                    <CustomInput
                      label="Re-Type Password"
                      value={values.confirmPassword}
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      initialTouched={true}
                      handleChange={handleChange('confirmPassword')}
                      isShowPasswordIcon={true}
                    />
                  </View>

                  <View style={{width: '100%', paddingBottom: height * 0.012}}>
                    <CustomButton isDisabled={isLoading} onPress={handleSubmit}>
                      {isLoading ? <CustomLoader /> : 'Sign Up'}
                    </CustomButton>
                  </View>
                </>
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
              <PrivacyPolicyText text="By creating an account" />
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
                    Already have an account?
                  </Text>
                  <Text> </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text
                      style={{
                        color: primaryColor,
                        fontFamily: 'SpaceGrotesk-Regular',
                        fontSize: width * 0.032,
                      }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(211,211,211)',
    opacity: 0.1,
    flex: 1,
    position: 'absolute',
    // remove width and height to override fixed static size
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
    gap: 5,
  },
});
