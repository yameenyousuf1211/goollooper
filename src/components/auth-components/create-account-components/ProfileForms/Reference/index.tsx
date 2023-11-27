import React, {useState} from 'react';
import { View} from 'react-native';
import CustomInput from '../../../../reuseable-components/CustomInput';
import { IUser, IUserFormErrors } from '../../../../../interfaces/user.interface';

interface Props {
  values: IUser;
  errors: IUserFormErrors;
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
        value={values.reference?.referenceName}
        error={errors.reference?.referenceName}
        touched={touched.reference?.referenceName}
        initialTouched={true}
        handleChange={handleChange('reference.referenceName')}
      />
      <CustomInput
        label="Contact Information"
        placeholder="Type their phone, linkedin, email etc."
        value={values.reference?.contact}
        error={errors.reference?.contact}
        touched={touched.reference?.contact}
        initialTouched={true}
        handleChange={handleChange('reference.contact')}
      />
    </View>
  );
};

export default Reference;
