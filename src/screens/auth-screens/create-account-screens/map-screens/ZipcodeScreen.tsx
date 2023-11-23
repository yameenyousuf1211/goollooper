import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import CustomButton from '../../../../components/reuseable-components/CustomButton';
import CustomInput from '../../../../components/reuseable-components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import {IUser} from '../../../../interfaces/user.interface';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {setUserData} from '../../../../redux/AuthSlice';

interface FormValues {
  zipCode: string;
}

const ZipcodeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [zipCodes, setZipCodes] = useState(['']); // Initial state with one empty string

  const initialValues: FormValues = {
    zipCode: (prevUserData?.zipCode && prevUserData?.zipCode[0]?.code) || '',
  };

  const handleSubmit = (values: IUser) => {
    const data: Partial<IUser> = {
      ...prevUserData,
      zipCode: [
        {
          code: values?.zipCode as any,
          isSelected: true,
        },
      ],
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
          <Formik initialValues={initialValues as any} onSubmit={handleSubmit}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <View style={{gap: 8}}>
                  {zipCodes.map((zipCode, index) => (
                    <View key={index} style={{gap: 8}}>
                      <CustomInput
                        label={`Zip Code ${index + 1}`}
                        placeholder="3142"
                        value={zipCode}
                        error={errors.zipCode}
                        touched={touched.zipCode}
                        handleChange={value => {
                          setFieldValue('zipCode', value);
                          setZipCodes(prevCodes =>
                            prevCodes.map((prevCode, i) =>
                              i === index ? value : prevCode,
                            ),
                          );
                        }}
                        keyboardType="numeric"
                      />
                    </View>
                  ))}
                  <CustomButton
                    extraStyles={{backgroundColor: '#F8F8F8'}}
                    onPress={() => setZipCodes([...zipCodes, ''])}>
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
                    onPress={handleSubmit}>
                    Done
                  </CustomButton>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default ZipcodeScreen;

const styles = StyleSheet.create({
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
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
