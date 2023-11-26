import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import ChevronBottomIcon from '../../../../../assets/icons/ChevronBottomIcon';
import ProfileOverview from './ProfileOverview';
import VisualValidationForm from './VisualValidationForm';
import {
  IUser,
  IUserFormErrors,
  IUserRole,
} from '../../../../interfaces/user.interface';
import BrandInfoForm from './BrandInfoForm';
import ProfessionalCertificates from './ProfessionalCertificates';
import Licensing from './Licensing';
import Reference from './Reference';
import LiabilityInsurance from './LiabilityInsurance';
import {primaryColor} from '../../../../utils/colors';
import {IBoostType} from '../../../../redux/AuthSlice';
import ChevronRightIcon from '../../../../../assets/icons/ChevronRightIcon';

interface Props {
  profile: any;
  isSelected: boolean;
  selectedProfileOptions: string[];
  values: IUser;
  errors: IUserFormErrors;
  touched: any;
  userRole: IUserRole;
  boostType: IBoostType;
  userData: IUser;
  setFieldValue: any;
  setPhoneCode: any;
  handleChange: any;
  onSelectProfileOption: (id: string) => void;
}

const ProfileForms = ({
  profile,
  isSelected,
  selectedProfileOptions,
  values,
  errors,
  touched,
  userRole,
  boostType,
  userData,
  setFieldValue,
  setPhoneCode,
  handleChange,
  onSelectProfileOption,
}: Props) => {
  return (
    <>
      {boostType === null && profile.name === 'Profile Overview' && (
        <TouchableOpacity
          style={[
            styles.profileOptionsContainer,
            {
              backgroundColor: isSelected
                ? primaryColor
                : 'rgba(250, 250, 250, 1)',
            },
          ]}
          onPress={() => onSelectProfileOption(profile.id)}>
          <Text
            style={[
              globalStlyes.text14,
              {
                color: isSelected ? 'white' : '#161A1D',
              },
            ]}>
            {profile.name}
          </Text>
          {isSelected ? <ChevronBottomIcon /> : <ChevronRightIcon />}
        </TouchableOpacity>
      )}
      {boostType !== null && (
        <TouchableOpacity
          style={[
            styles.profileOptionsContainer,
            {
              backgroundColor: isSelected
                ? primaryColor
                : 'rgba(250, 250, 250, 1)',
            },
          ]}
          onPress={() => onSelectProfileOption(profile.id)}>
          <Text
            style={[
              globalStlyes.text14,
              {
                color: isSelected ? 'white' : '#161A1D',
              },
            ]}>
            {profile.name}
          </Text>
          {isSelected ? <ChevronBottomIcon /> : <ChevronRightIcon />}
        </TouchableOpacity>
      )}
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
        profile.name === 'Visual Validation' &&
        boostType !== null && <VisualValidationForm />}
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
        profile.name === 'Professional Certifications' &&
        boostType !== null && <ProfessionalCertificates />}
      {selectedProfileOptions.includes(profile.id) &&
        profile.name === 'Licensing' &&
        boostType !== null && <Licensing />}
      {selectedProfileOptions.includes(profile.id) &&
        profile.name === 'Reference' &&
        boostType !== null && (
          <Reference
            values={values as IUser}
            errors={errors as IUserFormErrors}
            touched={touched}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
          />
        )}
      {selectedProfileOptions.includes(profile.id) &&
        boostType !== null &&
        profile.name === 'Liability Insurance / Certification of Insurance' && (
          <LiabilityInsurance />
        )}
    </>
  );
};

export default ProfileForms;

const styles = StyleSheet.create({
  profileOptionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    height: 56,
  },
});
