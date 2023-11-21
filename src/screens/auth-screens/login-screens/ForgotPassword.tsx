import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {primaryColor, secondaryTextColor} from '../../../utils/colors';
import CustomInput from '../../../components/reuseable-components/CustomInput';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {Formik} from 'formik';
import {forgetPasswordSchema} from '../../../validations';
import Toast from 'react-native-toast-message';
import {getOtpCode} from '../../../api';
import useLoading from '../../../hooks/useLoading';
import CustomLoader from '../../../components/reuseable-components/CustomLoader';

const {width, height} = Dimensions.get('screen');

interface FormValues {
  email: string;
}

const ForgotPassword = ({navigation}: any) => {
  const {isLoading, startLoading, stopLoading} = useLoading();

  const initialValues: FormValues = {
    email: '',
  };
  const handleSubmit = async (values: FormValues) => {
    startLoading();
    try {
      const response = await getOtpCode(values);
      const data = response?.data.data;
      navigation.navigate('Verification', {
        otp: data?.code,
        email: values.email.toLowerCase(),
      });
      stopLoading();
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
      stopLoading();
    }
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        validationSchema={forgetPasswordSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={[styles.container]}>
            <View
              style={{
                width: '90%',
                height: '100%',
                paddingVertical: height * 0.024,
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <View style={{gap: height * 0.038, flex: 1}}>
                <View>
                  <Text style={styles.pageHeading}>Forgot Password?</Text>
                </View>

                <View style={{flex: 1}}>
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
                  <View
                    style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <CustomButton isDisabled={isLoading} onPress={handleSubmit}>
                      {isLoading ? <CustomLoader /> : 'Verify Account'}
                    </CustomButton>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Formik>
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
