import React, {useState, useRef, useEffect} from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../../../reuseable-components/CustomInput';
import {globalStlyes} from '../../../../../styles/GlobalStyles';
import {useRoute} from '@react-navigation/native';
import CustomPhoneInput from '../../../../reuseable-components/CustomPhoneInput';
import {FileData} from '../../../../../screens/auth-screens/create-account-screens/CreateProfileScreen';
import PhoneInput from 'react-native-phone-number-input';
import UploadPhotoContainer from '../../UploadPhotoContainer';
import CustomSelect from '../../../../reuseable-components/CustomSelect';
import SPLocation from './SPLocation';
import {IBoostType, IUserRole} from '../../../../../redux/AuthSlice';

interface Props {
  values: any;
  errors: any;
  touched: any;
  boostType: IBoostType;
  userRole: IUserRole;
  setFieldValue: any;
  handleChange: any;
}

const ProfileOverview = ({
  values,
  errors,
  touched,
  boostType,
  userRole,
  setFieldValue,
  handleChange,
}: Props) => {
  const route = useRoute();
  const [galleryPhotoOne, setGalleryPhotoOne] = useState<FileData | null>(null);
  const [galleryPhotoTwo, setGalleryPhotoTwo] = useState<FileData | null>(null);
  const [galleryPhotoThree, setGalleryPhotoThree] = useState<FileData | null>(
    null,
  );
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    if ((route?.params as any)?.gender) {
      setFieldValue('gender', (route?.params as any)?.gender);
    }
    if ((route?.params as any)?.volunteerItems?.length > 0) {
      setFieldValue('volunteer', (route?.params as any)?.volunteerItems);
    }
    if ((route?.params as any)?.SPSpecialityItems?.length > 0) {
      setFieldValue(
        'serviceProviderSpeciality',
        (route?.params as any)?.SPSpecialityItems,
      );
    }
  }, [route]);
  console.log(values.serviceProviderSpeciality, 'VOLL');

  return (
    <View style={{gap: 5}}>
      <CustomInput
        label="First Name"
        value={values.firstName}
        error={errors.firstName}
        touched={touched.firstName}
        initialTouched={true}
        handleChange={handleChange('firstName')}
      />
      <CustomInput
        label="Last Name"
        value={values.lastName}
        error={errors.lastName}
        touched={touched.lastName}
        initialTouched={true}
        handleChange={handleChange('lastName')}
      />
      <CustomInput
        label="Username"
        value={values.username}
        error={errors.username}
        touched={touched.username}
        initialTouched={true}
        handleChange={handleChange('username')}
      />
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
      <CustomPhoneInput
        label="Phone Number"
        placeholder="Type here"
        value={values.phone}
        error={errors.phone}
        touched={touched.phone}
        phoneInput={phoneInput}
        initialTouched={true}
        handleChange={handleChange('phone')}
        setFieldValue={setFieldValue}
      />
      <CustomSelect
        label="Gender"
        placeholder="Select"
        value={values.gender}
        error={errors.gender}
        touched={touched.gender}
        route="GenderScreen"
        isSingleItem={true}
      />
      <CustomInput
        label="Age"
        value={values.age}
        error={errors.age}
        touched={touched.age}
        initialTouched={true}
        keyboardType="numeric"
        handleChange={handleChange('age')}
      />
      <CustomInput
        label="About You"
        value={values.about}
        error={errors.about}
        touched={touched.about}
        initialTouched={true}
        handleChange={handleChange('about')}
        isTextArea={true}
        extraStyles={{height: 120}}
      />
      <View style={{gap: 20, paddingBottom: 20}}>
        <Text style={globalStlyes.text14}>Gallery</Text>
        <UploadPhotoContainer
          galleryPhotoOne={galleryPhotoOne}
          galleryPhotoTwo={galleryPhotoTwo}
          galleryPhotoThree={galleryPhotoThree}
          setGalleryPhotoOne={setGalleryPhotoOne}
          setGalleryPhotoTwo={setGalleryPhotoTwo}
          setGalleryPhotoThree={setGalleryPhotoThree}
        />
      </View>
      <CustomSelect
        label="Volunteer"
        placeholder="Select"
        value={values.volunteer}
        error={errors.volunteer}
        touched={touched.volunteer}
        route="VolunteerScreen"
        isSingleItem={false}
      />
      {userRole === 'serviceProvider' && (
        <CustomSelect
          label="Service Provider’s Speciality"
          placeholder="Select"
          value={values.serviceProviderSpeciality}
          error={errors.serviceProviderSpeciality}
          touched={touched.serviceProviderSpeciality}
          route="SPSpeciality"
        />
      )}
      <View>
        {boostType === 'BSL' && (
          <>
            <SPLocation
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
            />
            <View style={{marginTop: 20}}>
              <CustomSelect
                label="Add Schedule"
                placeholder="Day & Time"
                value={values.addSchedule}
                error={errors.addSchedule}
                touched={touched.addSchedule}
                route="ScheduleScreen"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileOverview;
