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

const BrandInfoForm = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
}: Props) => {
  const [logo, setLogo] = useState<FileData | null>(null);
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
        value={values.registration}
        error={errors.registration}
        touched={touched.registration}
        initialTouched={true}
        handleChange={handleChange('registration')}
      />
      <View style={{marginBottom: 20}}>
        <UploadProfile
          label="Company Logo"
          profilePicture={logo}
          setProfilePicture={setLogo}
        />
      </View>
      <CustomInput
        label="Website"
        placeholder="Url here"
        value={values.websiteUrl}
        error={errors.websiteUrl}
        touched={touched.websiteUrl}
        initialTouched={true}
        handleChange={handleChange('websiteUrl')}
      />
      <CustomInput
        label="Affiliations"
        value={values.affiliations}
        error={errors.affiliations}
        touched={touched.affiliations}
        initialTouched={true}
        handleChange={handleChange('affiliations')}
      />
      <CustomInput
        label="Publications"
        value={values.publications}
        error={errors.publications}
        touched={touched.publications}
        initialTouched={true}
        handleChange={handleChange('publications')}
      />
      <CustomInput
        label="Resume"
        value={values.resume}
        error={errors.resume}
        touched={touched.resume}
        initialTouched={true}
        handleChange={handleChange('resume')}
      />
    </View>
  );
};

export default BrandInfoForm;
