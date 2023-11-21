import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../../../reuseable-components/CustomInput';
import {globalStlyes} from '../../../../../styles/GlobalStyles';
import UploadProfile from '../../UploadProfile';
import {FileData} from '../../../../../screens/auth-screens/create-account-screens/CreateProfileScreen';

interface Props {
  values: any;
  errors: any;
  touched: any;
  setFieldValue: any;
  handleChange: any;
}

const Reference = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
}: Props) => {
  return (
    <View
      style={{
        gap: 10,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: '#ECECEC',
        padding: 10,
      }}>
      <CustomInput
        label="Name"
        placeholder="Type the name of person here"
        value={values.name}
        error={errors.name}
        touched={touched.name}
        initialTouched={true}
        handleChange={handleChange('name')}
      />
      <CustomInput
        label="Contact Information"
        placeholder="Type their phone number, linkedin etc."
        value={values.contactInfo}
        error={errors.contactInfo}
        touched={touched.contactInfo}
        initialTouched={true}
        handleChange={handleChange('contactInfo')}
      />
    </View>
  );
};

export default Reference;
