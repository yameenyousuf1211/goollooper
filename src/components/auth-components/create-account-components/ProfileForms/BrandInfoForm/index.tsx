import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../../../reuseable-components/CustomInput';
import {globalStlyes} from '../../../../../styles/GlobalStyles';
import UploadProfile from '../../UploadProfile';
import {
  IFileData,
  IUser,
  IUserFormErrors,
} from '../../../../../interfaces/user.interface';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/store';

interface Props {
  values: IUser;
  errors: IUserFormErrors;
  touched: any;
  setFieldValue: any;
  handleChange: any;
}

const BrandInfoForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
}: Props) => {
  const [logo, setLogo] = useState<IFileData | null>(null);


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
        label="Company Registration"
        value={values.company?.companyName}
        error={errors.company?.companyName}
        touched={touched.company?.company}
        initialTouched={true}
        handleChange={handleChange('company.companyName')}
      />
      <View style={{marginBottom: 20}}>
        <UploadProfile
          label="Company Logo"
          name='companyLogo'
          profilePicture={logo}
          setProfilePicture={setLogo}
        />
      </View>
      <CustomInput
        label="Website"
        placeholder="Url here"
        value={values.company?.website}
        error={errors.company?.website}
        touched={touched?.website}
        initialTouched={true}
        handleChange={handleChange('company.website')}
      />
      <CustomInput
        label="Affiliations"
        value={values.company?.affiliation}
        error={errors.company?.affiliation}
        touched={touched?.affiliation}
        initialTouched={true}
        handleChange={handleChange('company.affiliation')}
      />
      <CustomInput
        label="Publications"
        value={values.company?.publication}
        error={errors.company?.publication}
        touched={touched?.publication}
        initialTouched={true}
        handleChange={handleChange('company.publication')}
      />
      {/* <CustomInput
        label="Resume"
        value={values.resume}
        error={errors.resume}
        touched={touched.resume}
        initialTouched={true}
        handleChange={handleChange('resume')}
      /> */}
    </View>
  );
};

export default BrandInfoForm;
