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
import {verticalScale} from '../../../utils/metrics';
import {createProfileSchema} from '../../../validations';
import {Formik} from 'formik';
import CustomModal from '../../../components/modals/CustomBottomModal';
import UploadProfile from '../../../components/auth-components/create-account-components/UploadProfile';
import {PROFILE_OPTIONS} from '../../../utils/data';
import BoostProfile from '../../../components/auth-components/BoostProfile';
import {RootState} from '../../../redux/store';
import {useSelector, useDispatch} from 'react-redux';
import {setBoostType, setUserData, setuserRole} from '../../../redux/AuthSlice';
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
import ProfileForms from '../../../components/auth-components/create-account-components/ProfileForms';

const {width, height} = Dimensions.get('screen');
export const profileInitialValues: IUser = {
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
      dispatch(setUserData(null));
      dispatch(setBoostType(null));
      setIsProfileCompleted(true);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
      console.log(error, 'Error while create profile');
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
          initialValues={profileInitialValues}
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
                <View style={styles.innerContainer}>
                  <View style={{gap: 16}}>
                    <Text style={globalStlyes.pageHeading}>Create Profile</Text>
                    <UploadProfile
                      profilePicture={profilePicture}
                      setProfilePicture={setProfilePicture}
                    />
                    {PROFILE_OPTIONS.map((profile: any) => {
                      const isSelected = selectedProfileOptions.includes(
                        profile.id,
                      );
                      return (
                        <ProfileForms
                          key={profile?.id}
                          userData={userData as IUser}
                          profile={profile}
                          userRole={userRole}
                          isSelected={isSelected}
                          boostType={boostType}
                          errors={errors as IUserFormErrors}
                          values={values}
                          touched={touched}
                          selectedProfileOptions={selectedProfileOptions}
                          setFieldValue={setFieldValue}
                          setPhoneCode={setPhoneCode}
                          handleChange={handleChange}
                          onSelectProfileOption={handleSelectProfileOption}
                        />
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
                      boostType === null &&
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
  innerContainer: {
    width: '90%',
    height: '100%',
    flex: 1,
    paddingVertical: height * 0.024,
    justifyContent: 'space-between',
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
