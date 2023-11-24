import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {primaryColor, secondaryTextColor} from '../../../utils/colors';
import {globalStlyes} from '../../../styles/GlobalStyles';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import ChevronBottomIcon from '../../../../assets/icons/ChevronBottomIcon';
import {verticalScale} from '../../../utils/metrics';
import {createProfileSchema} from '../../../validations';
import {Formik} from 'formik';
import CustomModal from '../../../components/modals/CustomBottomModal';
import UploadProfile from '../../../components/auth-components/create-account-components/UploadProfile';
import {PROFILE_OPTIONS} from '../../../utils/data';
import ProfileOverview from '../../../components/auth-components/create-account-components/ProfileForms/ProfileOverview';
import VisualValidationForm from '../../../components/auth-components/create-account-components/ProfileForms/VisualValidationForm';
import BrandInfoForm from '../../../components/auth-components/create-account-components/ProfileForms/BrandInfoForm';
import ProfessionalCertificates from '../../../components/auth-components/create-account-components/ProfileForms/ProfessionalCertificates';
import Licensing from '../../../components/auth-components/create-account-components/ProfileForms/Licensing';
import Reference from '../../../components/auth-components/create-account-components/ProfileForms/Reference';
import LiabilityInsurance from '../../../components/auth-components/create-account-components/ProfileForms/LiabilityInsurance';
import BoostProfile from '../../../components/auth-components/BoostProfile';
import {RootState} from '../../../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import {setUserData, setuserRole} from '../../../redux/AuthSlice';
import {
  IFileData,
  IService,
  ISubService,
  IUser,
  IUserFormErrors,
} from '../../../interfaces/user.interface';
import Toast from 'react-native-toast-message';
import {updateProfile} from '../../../api';
import useLoading from '../../../hooks/useLoading';
import CustomLoader from '../../../components/reuseable-components/CustomLoader';

const {width, height} = Dimensions.get('screen');
const initialValues: IUser = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  phone: '',
  gender: '',
  age: '',
  about: '',
  volunteer: '',
  services: '',
  State: '',
  city: '',
  country: '',
  company: {
    companyName: '',
    publication: '',
    affiliation: '',
    website: '',
  },
  reference: {
    referenceName: '',
    contact: '',
  },
};

const CreateProfileScreen = ({navigation}: any) => {
  const boostType = useSelector((state: RootState) => state.auth.boostType);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userData = useSelector((state: RootState) => state.auth.user);
  const {isLoading, startLoading, stopLoading} = useLoading();

  const dispatch = useDispatch();

  const [isProfileOverview, setIsProfileOverview] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<IFileData | null>(null);
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);
  const [selectedProfileOptions, setSelectedProfileOptions] = useState<
    string[]
  >([]);
  const [phoneCode, setPhoneCode] = useState<string>('');

  const handleSelectProfileOption = (id: string) => {
    if (id === 'p1') {
      setIsProfileOverview(true);
    } else {
      setIsProfileOverview(false);
    }
    if (selectedProfileOptions.includes(id)) {
      setIsProfileOverview(false);
      const filterOptions = selectedProfileOptions.filter(
        (option: any) => option !== id,
      );
      setSelectedProfileOptions(filterOptions);
    } else {
      setSelectedProfileOptions((prev: any) => [...prev, id]);
    }
  };

  const handleSubmit = async (values: IUser) => {
    console.log(values, 'FORM SUBMIT VALUES!');
    startLoading();
    const volunteerItems = userData?.volunteer?.flatMap((item: IService) =>
      item.subServices.map((subItem: ISubService) => ({
        service: item._id,
        subService: subItem._id,
      })),
    );
    console.log(userData, 'before');
    const reqData: Partial<IUser> = {
      ...userData,
      ...values,
      profileImage: profilePicture,
      company: {
        ...values.company,
        logo: userData?.company?.logo,
        resume: userData?.company?.resume,
      },
      role: userRole,
      email: userData?.email,
      phone: `+${phoneCode}${values.phone}`,
      volunteer: volunteerItems as any,
      isProfileCompleted: false,
    };
    console.log(reqData, 'REQDATA');
    try {
      const response = await updateProfile(reqData as IUser);
      const data = response?.data.data;
      console.log(response?.data?.message, 'DATA');
      dispatch(setUserData(data));
      setIsProfileCompleted(true);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
      console.log(error?.response?.data);
    }
    stopLoading();
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      {isProfileCompleted ? (
        <CustomModal
          title="Profile Created"
          text="Congratulations! Your profile has been created successfully. You can now proceed to your dashboard."
          buttonText="Go To Dashboard"
          route="DashboardScreen"
          isCompleteProfile={true}
        />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={createProfileSchema(userRole)}
          validationContext={{userRole: userRole}}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={{flex: 1}}>
              <View style={globalStlyes.container}>
                <View
                  style={{
                    width: '90%',
                    height: '100%',
                    flex: 1,
                    paddingVertical: height * 0.024,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{gap: 16}}>
                    <Text style={globalStlyes.pageHeading}>Create Profile</Text>
                    <UploadProfile
                      profilePicture={profilePicture}
                      setProfilePicture={setProfilePicture}
                    />
                    {boostType === null &&
                      PROFILE_OPTIONS.map((profile: any) => {
                        const isSelected = selectedProfileOptions.includes(
                          profile.id,
                        );
                        return (
                          <>
                            {profile.name === 'Profile Overview' && (
                              <TouchableOpacity
                                style={[
                                  styles.profileOptionsContainer,
                                  {
                                    backgroundColor: isSelected
                                      ? primaryColor
                                      : 'rgba(250, 250, 250, 1)',
                                  },
                                ]}
                                onPress={() =>
                                  handleSelectProfileOption(profile.id)
                                }>
                                <Text
                                  style={[
                                    globalStlyes.text14,
                                    {
                                      color: isSelected ? 'white' : '#161A1D',
                                    },
                                  ]}>
                                  {profile.name}
                                </Text>
                                {isSelected ? (
                                  <ChevronBottomIcon />
                                ) : (
                                  <ChevronRightIcon />
                                )}
                              </TouchableOpacity>
                            )}

                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Profile Overview' && (
                                <ProfileOverview
                                  values={values as IUser}
                                  errors={errors as IUserFormErrors} // Explicit cast here
                                  boostType={boostType}
                                  userRole={userRole}
                                  touched={touched}
                                  setPhoneCode={setPhoneCode}
                                  userData={userData as IUser}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                />
                              )}
                            {/* {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Visual Validation' && (
                                <VisualValidationForm />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Brand Information' && (
                                <BrandInfoForm
                                  values={values as IUser}
                                  errors={errors as IUserFormErrors}
                                  touched={touched}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name ===
                                'Professional Certifications' && (
                                <ProfessionalCertificates />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Licensing' && <Licensing />}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Reference' && (
                                <Reference
                                  values={values}
                                  errors={errors}
                                  touched={touched}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name ===
                                'Liability Insurance / Certification of Insurance' && (
                                <LiabilityInsurance />
                              )} */}
                          </>
                        );
                      })}
                    {boostType &&
                      PROFILE_OPTIONS.map((profile: any) => {
                        const isSelected = selectedProfileOptions.includes(
                          profile.id,
                        );
                        return (
                          <>
                            <TouchableOpacity
                              style={[
                                styles.profileOptionsContainer,
                                {
                                  backgroundColor: isSelected
                                    ? primaryColor
                                    : 'rgba(250, 250, 250, 1)',
                                },
                              ]}
                              onPress={() =>
                                handleSelectProfileOption(profile.id)
                              }>
                              <Text
                                style={[
                                  globalStlyes.text14,
                                  {
                                    color: isSelected ? 'white' : '#161A1D',
                                  },
                                ]}>
                                {profile.name}
                              </Text>
                              {isSelected ? (
                                <ChevronBottomIcon />
                              ) : (
                                <ChevronRightIcon />
                              )}
                            </TouchableOpacity>
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Profile Overview' && (
                                <ProfileOverview
                                  values={values as IUser}
                                  errors={errors as IUserFormErrors}
                                  boostType={boostType}
                                  userRole={userRole}
                                  userData={userData as IUser}
                                  touched={touched}
                                  setPhoneCode={setPhoneCode}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Visual Validation' && (
                                <VisualValidationForm />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Brand Information' && (
                                <BrandInfoForm
                                  values={values as IUser}
                                  errors={errors as IUserFormErrors}
                                  touched={touched}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name ===
                                'Professional Certifications' && (
                                <ProfessionalCertificates />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Licensing' && <Licensing />}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name === 'Reference' && (
                                <Reference
                                  values={values as IUser}
                                  errors={errors as IUserFormErrors}
                                  touched={touched}
                                  setFieldValue={setFieldValue}
                                  handleChange={handleChange}
                                />
                              )}
                            {selectedProfileOptions.includes(profile.id) &&
                              profile.name ===
                                'Liability Insurance / Certification of Insurance' && (
                                <LiabilityInsurance />
                              )}
                          </>
                        );
                      })}

                    {boostType === null && isProfileOverview && (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          if (userRole === 'service_provider') {
                            dispatch(setuserRole('user'));
                          } else {
                            dispatch(setuserRole('service_provider'));
                          }
                        }}>
                        <View
                          style={{
                            width: 14,
                            height: 14,
                            borderWidth:
                              userRole === 'service_provider' ? undefined : 1,
                            borderColor: '#B9BABB',
                            backgroundColor:
                              userRole === 'service_provider'
                                ? primaryColor
                                : undefined,
                          }}
                        />
                        <Text style={globalStlyes.text14}>
                          Service Provider
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userRole === 'service_provider' &&
                      boostType == null &&
                      isProfileOverview && (
                        <BoostProfile
                          onBoostProfile={() =>
                            navigation.navigate('SubscriptionScreen')
                          }
                        />
                      )}
                  </View>
                  <View
                    style={[
                      styles.buttonContainer,
                      {
                        marginTop: isProfileOverview ? 240 : verticalScale(300),
                      },
                    ]}>
                    <CustomButton
                      // isDisabled={!isCreateProfileForm}
                      extraStyles={{width: 77}}
                      isDisabled={isLoading}
                      onPress={handleSubmit}>
                      {isLoading ? <CustomLoader /> : 'Done'}
                    </CustomButton>
                  </View>
                </View>
              </View>
            </View>
          )}
        </Formik>
      )}
    </ScrollView>
  );
};

export default CreateProfileScreen;

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
  profileOptionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    height: 56,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
