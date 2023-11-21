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
import {primaryColor, secondaryTextColor} from '../../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/reuseable-components/CustomInput';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {createNewPasswordSchema} from '../../../validations';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import {resetPassword} from '../../../api';
import useLoading from '../../../hooks/useLoading';
import CustomLoader from '../../../components/reuseable-components/CustomLoader';

const {width, height} = Dimensions.get('screen');

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = ({navigation}: any) => {
  const {isLoading, startLoading, stopLoading} = useLoading();

  const initialValues: FormValues = {
    newPassword: '',
    confirmPassword: '',
  };
  const handleSubmit = async (values: FormValues) => {
    console.log(values);
    startLoading();
    const reqData = {
      password: values.newPassword,
      confirmPassword: values.confirmPassword
    };
    try {
      const response = await resetPassword(reqData);
      navigation.navigate('Login');
      Toast.show({
        type: 'success',
        text1: `${response?.data.message}`,
        visibilityTime: 5000,
      });
    } catch (error: any) {
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
      <Formik
        initialValues={initialValues}
        validationSchema={createNewPasswordSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View style={styles.container}>
            <View
              style={{
                width: '90%',
                height: '100%',
                paddingVertical: height * 0.024,
                justifyContent: 'space-between',
              }}>
              <View style={{gap: height * 0.0218}}>
                <View>
                  <Text style={styles.pageHeading}>Reset Password</Text>
                </View>
                <CustomInput
                  label="New Password"
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
              <View style={{width: '100%'}}>
                <CustomButton isDisabled={isLoading} onPress={handleSubmit}>
                  {isLoading ? <CustomLoader /> : 'Reset Password'}
                </CustomButton>
              </View>
            </View>
          </View>
        )}
      </Formik>
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
