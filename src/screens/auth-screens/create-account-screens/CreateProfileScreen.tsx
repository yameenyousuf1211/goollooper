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
import {setAuthentication, setuserRole} from '../../../redux/AuthSlice';

const {width, height} = Dimensions.get('screen');

export type FileData = {
  uri: string;
  name: string;
  type: string;
};

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  about: string;
  gender: string;
  age: string;
  volunteer: string;
  serviceProviderSpeciality: string;
  addSchedule: string;
  // brand
  registration: string;
  websiteUrl: string;
  affiliations: string;
  publications: string;
  resume: string;

  // location
  state: string;
  city: string;
  country: string;

  //reference
  name: string;
  contactInfo: string;
}

const CreateProfileScreen = ({navigation}: any) => {
  const boostType = useSelector((state: RootState) => state.auth.boostType);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const dispatch = useDispatch();

  const [isProfileOverview, setIsProfileOverview] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<FileData | null>(null);
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);
  const [selectedProfileOptions, setSelectedProfileOptions] = useState<
    string[]
  >([]);

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
      console.log(filterOptions, 'filter');
      setSelectedProfileOptions(filterOptions);
    } else {
      setSelectedProfileOptions((prev: any) => [...prev, id]);
    }
  };

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    phone: '',
    about: '',
    gender: '',
    age: '',
    volunteer: '',
    serviceProviderSpeciality: '',
    addSchedule: '',
    // company
    registration: '',
    websiteUrl: '',
    affiliations: '',
    publications: '',
    resume: '',

    // loc

    state: '',
    city: '',
    country: '',
    // reference
    name: '',
    contactInfo: '',
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values, 'Values');
    setIsProfileCompleted(true);
    dispatch(setAuthentication(true));
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
          validationSchema={createProfileSchema}
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
                                  values={values}
                                  errors={errors}
                                  boostType={boostType}
                                  userRole={userRole}
                                  touched={touched}
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
                                  values={values}
                                  errors={errors}
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
                              )}
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
                                  values={values}
                                  errors={errors}
                                  boostType={boostType}
                                  userRole={userRole}
                                  touched={touched}
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
                                  values={values}
                                  errors={errors}
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
                          if (userRole === 'serviceProvider') {
                            dispatch(setuserRole(null));
                          } else {
                            dispatch(setuserRole('serviceProvider'));
                          }
                        }}>
                        <View
                          style={{
                            width: 14,
                            height: 14,
                            borderWidth: userRole ? undefined : 1,
                            borderColor: '#B9BABB',
                            backgroundColor: userRole
                              ? primaryColor
                              : undefined,
                          }}
                        />
                        <Text style={globalStlyes.text14}>
                          Service Provider
                        </Text>
                      </TouchableOpacity>
                    )}
                    {userRole === 'serviceProvider' && boostType == null && (
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
                      onPress={handleSubmit}>
                      Done
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
