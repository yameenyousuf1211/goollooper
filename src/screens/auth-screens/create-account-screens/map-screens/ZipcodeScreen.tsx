import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import CustomButton from '../../../../components/reuseable-components/CustomButton';
import CustomInput from '../../../../components/reuseable-components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {IUser, IZipCode} from '../../../../interfaces/user.interface';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {setUserData} from '../../../../redux/AuthSlice';
import {primaryColor} from '../../../../utils/colors';

interface FormValues {
  zipCode: IZipCode;
}

const ZipcodeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [zipCodes, setZipCodes] = useState(['']);
  const [borderBoxVisibility, setBorderBoxVisibility] = useState([false]);
  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState<
    number | null
  >(null);

  const initialValues: FormValues = {
    zipCode: {
      code: '',
      isSelected: false,
    },
  };

  useEffect(() => {
    if (
      prevUserData?.zipCode &&
      prevUserData.zipCode.length > 0 &&
      Array.isArray(prevUserData.zipCode)
    ) {
      const codes = prevUserData.zipCode.map((item: any) => item.code);
      const visibility = prevUserData.zipCode.map(
        (item: any) => item.isSelected,
      );
      setZipCodes(codes);
      setBorderBoxVisibility(
        Array.from({length: prevUserData.zipCode.length}, () => true),
      );
      const selectedIndex = visibility.findIndex(isSelected => isSelected);
      setSelectedCheckboxIndex(selectedIndex !== -1 ? selectedIndex : null);
    }
  }, []);

  const handleSubmit = () => {
    const filteredZipCodes = zipCodes.filter(zipCode => zipCode.trim() !== '');
    const data: Partial<IUser> = {
      ...prevUserData,
      zipCode: filteredZipCodes.map((zipCode, index) => ({
        code: zipCode,
        isSelected: selectedCheckboxIndex === index,
      })),
    };
    dispatch(setUserData(data as IUser));
    navigation.navigate('CreateProfileScreen');
  };

  return (
    <View
      style={[
        globalStlyes.container,
        {alignItems: 'flex-start', padding: 20, paddingTop: 20},
      ]}>
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            gap: 32,
            justifyContent: 'space-between',
            flex: 1,
            width: '100%',
          }}>
 
          <View style={{gap: 8}}>
            {zipCodes.map((zipCode, index) => (
              <View key={index} style={{gap: 8, position: 'relative'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CustomInput
                    label={`Zip Code`}
                    placeholder="3142"
                    value={zipCode}
                    // error={errors.zipCode}
                    // touched={touched.zipCode}
                    handleChange={value => {
                      // setFieldValue('zipCode', value);
                      setZipCodes(prevCodes =>
                        prevCodes.map((prevCode, i) =>
                          i === index ? value : prevCode,
                        ),
                      );
                      setBorderBoxVisibility(prevVisibility =>
                        prevVisibility.map((_, i) =>
                          i === index ? !!value : _,
                        ),
                      );
                    }}
                    keyboardType="numeric"
                    extraStyles={{width: 330}}
                  />
                  {borderBoxVisibility[index] && (
                    <TouchableOpacity
                      onPress={() => {
                        selectedCheckboxIndex === index
                          ? setSelectedCheckboxIndex(null)
                          : setSelectedCheckboxIndex(index);
                      }}
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: selectedCheckboxIndex == index ? 0 : 1,
                        backgroundColor:
                          selectedCheckboxIndex == index
                            ? primaryColor
                            : undefined,
                        borderColor: '#B9BABB',
                        position: 'absolute',
                        right: 0,
                        top: 10,
                      }}
                    />
                  )}
                </View>
              </View>
            ))}
            <CustomButton
              extraStyles={{backgroundColor: '#F8F8F8'}}
              onPress={() => {
                setZipCodes([...zipCodes, '']);
                setBorderBoxVisibility([...borderBoxVisibility, false]);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 4,
                  alignItems: 'center',
                }}>
                <View>
                  <Icon name="add-outline" size={20} color={'#B6B7B8'} />
                </View>
                <Text style={[globalStlyes.text14, {color: '#B7B7B7'}]}>
                  Add more
                </Text>
              </View>
            </CustomButton>
          </View>
          <View style={[styles.buttonContainer]}>
            <CustomButton
              extraStyles={{width: 77}}
              isDisabled={selectedCheckboxIndex === null}
              onPress={handleSubmit}>
              Done
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ZipcodeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
