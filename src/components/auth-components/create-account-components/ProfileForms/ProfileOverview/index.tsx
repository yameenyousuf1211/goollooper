import React, {useState, useRef, useEffect} from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../../../reuseable-components/CustomInput';
import {globalStlyes} from '../../../../../styles/GlobalStyles';
import {useRoute} from '@react-navigation/native';
import CustomPhoneInput from '../../../../reuseable-components/CustomPhoneInput';
import PhoneInput from 'react-native-phone-number-input';
import UploadPhotoContainer from '../../UploadPhotoContainer';
import CustomSelect from '../../../../reuseable-components/CustomSelect';
import SPLocation from './SPLocation';
import {IBoostType} from '../../../../../redux/AuthSlice';
import {
  IFileData,
  IUser,
  IUserFormErrors,
  IUserRole,
} from '../../../../../interfaces/user.interface';
import {checkUsername} from '../../../../../api';

interface Props {
  values: IUser;
  errors: IUserFormErrors;
  userData: IUser;
  touched: any;
  boostType: IBoostType;
  userRole: IUserRole;
  setPhoneCode: any;
  setFieldValue: any;
  handleChange: any;
}

const ProfileOverview = ({
  values,
  errors,
  touched,
  userData,
  boostType,
  userRole,
  setPhoneCode,
  setFieldValue,
  handleChange,
}: Props) => {
  const route = useRoute();
  const [galleryPhotoOne, setGalleryPhotoOne] = useState<IFileData | null>(
    null,
  );
  const [galleryPhotoTwo, setGalleryPhotoTwo] = useState<IFileData | null>(
    null,
  );
  const [galleryPhotoThree, setGalleryPhotoThree] = useState<IFileData | null>(
    null,
  );
  const [userNameError, setUserNameError] = useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);

  useEffect(() => {
    if (userData?.gender) {
      setFieldValue('gender', userData?.gender);
    }
    if (userData?.volunteer && userData?.volunteer.length > 0) {
      setFieldValue('volunteer', userData?.volunteer);
    }
    if (userData?.services && userData?.services.length > 0) {
      setFieldValue('services', userData?.services);
    }
  }, [userData,userData?.volunteer]);

  const handleChangeUserName = async (text: string, setFieldValue: any) => {
    setFieldValue('userName', text);
    try {
      const response = await checkUsername({userName: text});
      console.log(response.data);
      setUserNameError('');
    } catch (error: any) {
      console.log(error.response.data);
      if (error?.response.status == 409) {
        setUserNameError(error?.response.data.message);
      }
    }
  };

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
        value={values.userName}
        error={errors.userName || userNameError}
        touched={touched.userName}
        initialTouched={true}
        handleChange={text => handleChangeUserName(text, setFieldValue)}
      />
      <CustomInput
        label="Email Address"
        value={userData?.email}
        touched={touched.email}
        initialTouched={true}
        keyboardType="email-address"
        autoCapitalize="none"
        isDisable={true}
        handleChange={handleChange('email')}
      />
      <CustomPhoneInput
        label="Phone Number"
        placeholder="Type here"
        value={values.phone as string}
        error={errors.phone}
        touched={touched.phone}
        phoneInput={phoneInput}
        initialTouched={true}
        handleChange={handleChange('phone')}
        setFieldValue={setFieldValue}
        setPhoneCode={setPhoneCode}
      />
      <CustomSelect
        label="Gender"
        placeholder="Select"
        value={values.gender as string}
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
        isMultiline={true}
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
          name="gallery"
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
      {userRole === 'service_provider' && (
        <CustomSelect
          label="Service Provider’s Speciality"
          placeholder="Select"
          value={values.services}
          error={errors.services}
          touched={touched.services}
          route="SPSpeciality"
        />
      )}
      <View>
        {boostType === 'BSL' && (
          <>
            <SPLocation
              values={values as IUser}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
              handleChange={handleChange}
            />
            <View style={{marginTop: 20}}>
              <CustomSelect
                label="Add Schedule"
                placeholder="Day & Time"
                value={''}
                error={''}
                touched={touched.addSchedule}
                route="ScheduleScreen"
                isDisable={boostType !== 'BSL'}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileOverview;
