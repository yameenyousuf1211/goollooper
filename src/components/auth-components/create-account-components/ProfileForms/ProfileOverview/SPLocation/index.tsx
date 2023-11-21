import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, secondaryTextColor} from '../../../../../../utils/colors';
import CheckIconTwo from '../../../../../../../assets/icons/CheckIconTwo';
import {globalStlyes} from '../../../../../../styles/GlobalStyles';
import CustomInput from '../../../../../reuseable-components/CustomInput';
import CustomSelect from '../../../../../reuseable-components/CustomSelect';
import LocationIcon from '../../../../../../../assets/icons/LocationIcon';
import {useNavigation} from '@react-navigation/native';

interface Props {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
}

const SPLocation = ({values, errors, touched,handleChange}: Props) => {
  const navigation = useNavigation<any>();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectOption = (name: string) => {
    if (selectedOption === name) {
      setSelectedOption('');
    } else {
      setSelectedOption(name);
    }
  };
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
          onPress={() => handleSelectOption('Universal')}>
          <View
            style={[
              styles.iconContainer,
              {
                borderWidth: selectedOption.includes('Universal') ? 0 : 1,
                borderColor: '#B9BABB',
                backgroundColor: selectedOption.includes('Universal')
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
          onPress={() => handleSelectOption('Local')}>
          <View
            style={[
              styles.iconContainer,
              {
                borderWidth: selectedOption.includes('Local') ? 0 : 1,
                borderColor: '#B9BABB',
                backgroundColor: selectedOption.includes('Local')
                  ? primaryColor
                  : 'transparent',
              },
            ]}>
            <CheckIconTwo />
          </View>
          <Text style={globalStlyes.text14}>Local</Text>
        </TouchableOpacity>
        {selectedOption == 'Local' && (
          <View style={{marginTop: 10}}>
            <View style={{position: 'relative'}}>
              <CustomInput
                label="Location"
                value={values.location}
                touched={touched.location}
                handleChange={handleChange('location')}
              />
              <TouchableOpacity
                style={{position: 'absolute', right: 10, bottom: 40}}
                onPress={() => navigation.navigate('MapScreen')}>
                <LocationIcon />
              </TouchableOpacity>
            </View>
            <CustomSelect
              label="State"
              placeholder="Select"
              value={values.state}
              error={errors.state}
              touched={touched.state}
              route="StateScreen"
            />
            <CustomSelect
              label="City"
              placeholder="Select"
              value={values.city}
              error={errors.city}
              touched={touched.city}
              route="CityScreen"
            />
            <CustomSelect
              label="Country"
              placeholder="Select"
              value={values.country}
              error={errors.country}
              touched={touched.country}
              route="CountryScreen"
            />
            <CustomSelect
              label="Zip Code"
              placeholder="Select"
              value={values.state}
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
