import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, secondaryTextColor} from '../../../../../../utils/colors';
import CheckIconTwo from '../../../../../../../assets/icons/CheckIconTwo';
import {globalStlyes} from '../../../../../../styles/GlobalStyles';
import CustomInput from '../../../../../reuseable-components/CustomInput';
import CustomSelect from '../../../../../reuseable-components/CustomSelect';
import LocationIcon from '../../../../../../../assets/icons/LocationIcon';
import {useNavigation} from '@react-navigation/native';
import {
  ILocationType,
  IUser,
  IZipCode,
} from '../../../../../../interfaces/user.interface';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../../redux/store';
import {setUserData} from '../../../../../../redux/AuthSlice';

interface Props {
  values: IUser;
  errors: any;
  touched: any;
  setFieldValue: any;
  handleChange: any;
}

const SPLocation = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
}: Props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation<any>();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedZipCode, setSelectedZipCode] = useState<any>({
    code: '',
    isSelected: false,
  });

  const handleSelectOption = (name: ILocationType) => {
    if (selectedOption === name) {
      setSelectedOption('');
      const data: Partial<IUser> = {
        ...userData,
        locationType: null,
      };
      dispatch(setUserData(data as IUser));
      navigation.navigate('CreateProfileScreen');
    } else {
      setSelectedOption(name);
      const data: Partial<IUser> = {
        ...userData,
        locationType: name,
      };
      dispatch(setUserData(data as IUser));
      navigation.navigate('CreateProfileScreen');
    }
  };

  useEffect(() => {
    if (userData?.State) {
      setFieldValue('State', userData?.State);
    }
    if (userData?.city) {
      setFieldValue('city', userData?.city);
    }
    if (userData?.country) {
      setFieldValue('country', userData?.country);
    }
    if (userData?.readableLocation) {
      setFieldValue('location', userData?.readableLocation);
    }
    if (userData?.zipCode && userData?.zipCode?.length > 0) {
      const selectedCode = userData?.zipCode.filter(
        (zipCode: IZipCode) => zipCode.isSelected,
      );
      setSelectedZipCode(selectedCode[0]);
    }
  }, [userData]);

  return (
    <View style={{gap: 16}}>
      <Text
        style={{
          color: secondaryTextColor,
          fontFamily: 'SpaceGrotesk-Medium',
          fontSize: 14,
        }}>
        Service Provider’s Geo
      </Text>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleSelectOption('global')}>
          <View
            style={[
              styles.iconContainer,
              {
                borderWidth: selectedOption.includes('global') ? 0 : 1,
                borderColor: '#B9BABB',
                backgroundColor: selectedOption.includes('global')
                  ? primaryColor
                  : 'transparent',
              },
            ]}>
            <CheckIconTwo />
          </View>
          <Text style={globalStlyes.text14}>Universal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleSelectOption('local')}>
          <View
            style={[
              styles.iconContainer,
              {
                borderWidth: selectedOption.includes('local') ? 0 : 1,
                borderColor: '#B9BABB',
                backgroundColor: selectedOption.includes('local')
                  ? primaryColor
                  : 'transparent',
              },
            ]}>
            <CheckIconTwo />
          </View>
          <Text style={globalStlyes.text14}>Local</Text>
        </TouchableOpacity>
        {selectedOption == 'local' && (
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              style={{position: 'relative'}}
              onPress={() => navigation.navigate('MapScreen')}>
              <CustomInput
                label="Set Location"
                placeholder="Set Location"
                value={values.location}
                isDisable={true}
                touched={touched.location}
                isMultiline={true}
                handleChange={handleChange('location')}
              />
              <View style={{position: 'absolute', right: 10, bottom: 40}}>
                <LocationIcon />
              </View>
            </TouchableOpacity>
            <CustomSelect
              label="State"
              placeholder="Select"
              value={values.State as string}
              error={errors.State}
              touched={touched.State}
              route="StateScreen"
              isSingleItem={true}
            />
            <CustomSelect
              label="City"
              placeholder="Select"
              value={values.city as string}
              error={errors.city}
              isSingleItem={true}
              touched={touched.city}
              route="CityScreen"
            />
            <CustomSelect
              label="Country"
              placeholder="Select"
              value={values.country as string}
              error={errors.country}
              touched={touched.country}
              route="CountryScreen"
              isSingleItem={true}
            />
            <CustomSelect
              label="Zip Code"
              placeholder="Select"
              isSingleItem={true}
              value={selectedZipCode?.code ? selectedZipCode.code : ''}
              error={errors.state}
              touched={touched.state}
              route="ZipcodeScreen"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SPLocation;

const styles = StyleSheet.create({
  innerContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    gap: 16,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
