import React, {useState} from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
import {globalStlyes} from '../../styles/GlobalStyles';
import StarIcon from '../../../assets/icons/StarIcon';
import {primaryColor} from '../../utils/colors';
import LocationIconTwo from '../../../assets/icons/LocationIconTwo';
import {Formik} from 'formik';
import {profileInitialValues} from '../auth-screens/create-account-screens/CreateProfileScreen';
import {createProfileSchema} from '../../validations';
import ProfileForms from '../../components/auth-components/create-account-components/ProfileForms';
import {IUser, IUserFormErrors} from '../../interfaces/user.interface';
import {PROFILE_OPTIONS} from '../../utils/data';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import CustomButton from '../../components/reuseable-components/CustomButton';

const SPProfile = () => {
  const boostType = useSelector((state: RootState) => state.auth.boostType);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isProfileOverview, setIsProfileOverview] = useState<boolean>(false);
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

  const handleSubmit = () => {};

  return (
    <View style={[globalStlyes.container]}>
      <ScrollView>
        <View style={{width: '82%'}}>
          <View style={{flexDirection: 'row', gap: 8, padding: 20}}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
              }}
              width={100}
              height={100}
              style={styles.image}
            />
            <View>
              <View>
                <Text style={globalStlyes.text16}>Charlie Bargson</Text>
                <Text style={globalStlyes.text12}>@charliebargson</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  marginTop: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    backgroundColor: 'rgba(255, 243, 206, 1)',
                    borderRadius: 12,
                    padding: 10,
                    paddingHorizontal: 16,
                  }}>
                  <StarIcon />
                  <Text style={[globalStlyes.text14, {color: primaryColor}]}>
                    {' '}
                    4.9
                  </Text>
                </View>
                <Text style={[globalStlyes.text14, {color: primaryColor}]}>
                  BSL
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: primaryColor,
                    borderRadius: 100,
                    width: 34,
                    height: 34,
                  }}>
                  <LocationIconTwo />
                </View>
              </View>
            </View>
          </View>
          <View style={{gap: 12, padding: 20}}>
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
              }) =>
                PROFILE_OPTIONS.map((profile: any) => {
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
                      boostType={'BSL'}
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
                })
              }
            </Formik>
          </View>
          <View style={{margin: 20,}}>
            <CustomButton extraStyles={{backgroundColor: '#28BF5A'}}>Add To Go List</CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SPProfile;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 200,
  },
});
