import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import CustomButton from '../../../../components/reuseable-components/CustomButton';
import CustomInput from '../../../../components/reuseable-components/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';

const ZipcodeScreen = ({navigation}: any) => {
  return (
    <View
      style={[
        globalStlyes.container,
        {alignItems: 'flex-start', padding: 20, paddingTop: 20},
      ]}>
      <View
        style={{
          gap: 32,
          justifyContent: 'space-between',
          flex: 1,
          width: '100%',
        }}>
        <View style={{gap: 8}}>
          <CustomInput
            label="Zip Code"
            placeholder="3142"
            keyboardType="numeric"
            value="3142"
          />
          <CustomInput
            label="Zip Code"
            placeholder="3142"
            keyboardType="numeric"
            value="3142"
          />

          <CustomButton
            extraStyles={{backgroundColor: '#F8F8F8'}}
            isDisabled={true}>
            <View style={{flexDirection: 'row', gap: 4, alignItems: 'center'}}>
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
            onPress={() => navigation.navigate('CreateProfileScreen')}>
            Done
          </CustomButton>
        </View>
      </View>
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
