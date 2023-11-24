import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {primaryColor} from '../../../utils/colors';
import CheckIconTwo from '../../../../assets/icons/CheckIconTwo';
import ChevronBottomIconTwo from '../../../../assets/icons/ChevronBottomIconTwo';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {IUser} from '../../../interfaces/user.interface';
import {setUserData} from '../../../redux/AuthSlice';
import CustomInput from '../../../components/reuseable-components/CustomInput';
import {Formik} from 'formik';
import * as Yup from 'yup';

export const genderSchema = Yup.object().shape({
  gender: Yup.string()
    .required('Gender is required')
    .matches(/^[A-Za-z]+$/, 'Invalid Gender Name'), // Ensures no spaces in the name
});

const GenderScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [genderValue, setGenderValue] = useState<string>('');
  const [genderError, setGenderError] = useState<string>('');

  useEffect(() => {
    if (prevUserData?.gender) {
      console.log(prevUserData.gender)
      if (prevUserData?.gender !== 'Male' && prevUserData?.gender !== 'Female') {
        setSelectedItem('Other');
        setGenderValue(prevUserData?.gender)
      } else {
        setSelectedItem(prevUserData.gender);
      }
    }
  }, []);

  const handleSelectItem = (item: string) => {
    if (selectedItem?.includes(item)) {
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
  };

  const handleGenderChange = (text: string) => {
    const regex = /^[A-Za-z]+$/;
    const isValid = regex.test(text);
    setGenderValue(text);
    setGenderError(isValid ? '' : 'Invalid Gender Name');
  };

  const handleSubmit = () => {
    if (selectedItem === 'Other' && genderValue == '') {
      setGenderError('Enter gender!');
      return;
    }
    const data: Partial<IUser> = {
      ...prevUserData,
      gender: selectedItem === 'Other' ? genderValue : selectedItem,
    };
    dispatch(setUserData(data as IUser));
    navigation.navigate('CreateProfileScreen');
  };
  return (
    <View
      style={[
        globalStlyes.container,
        {padding: 20, justifyContent: 'space-between', paddingTop: 20},
      ]}>
      <View
        style={{
          backgroundColor: '#F9F9F9',
          padding: 20,
          width: '100%',
          gap: 16,
          borderRadius: 12,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <View
              style={{
                width: 14,
                height: 14,
                backgroundColor: primaryColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CheckIconTwo />
            </View>
            <Text style={globalStlyes.text14}>Gender</Text>
          </View>
          <ChevronBottomIconTwo />
        </View>
        <View style={{gap: 6, borderRadius: 12}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {['Male', 'Female', 'Other'].map((item: any) => (
              <TouchableOpacity
                style={{
                  backgroundColor: selectedItem?.includes(item)
                    ? primaryColor
                    : 'transparent',
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                  padding: 10,
                  borderRadius: 12,
                }}
                key={item}
                onPress={() => handleSelectItem(item)}>
                <Text
                  style={{
                    color: selectedItem?.includes(item) ? 'white' : '#949494',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedItem == 'Other' && (
            <CustomInput
              label=""
              value={genderValue}
              touched={true}
              error={genderError}
              handleChange={handleGenderChange}
            />
          )}
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'flex-end'}}>
        <CustomButton
          isDisabled={selectedItem === ''}
          extraStyles={{width: 77}}
          onPress={handleSubmit}>
          Done
        </CustomButton>
      </View>
    </View>
  );
};

export default GenderScreen;
