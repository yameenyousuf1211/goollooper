import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {primaryColor} from '../../../utils/colors';
import CheckIconTwo from '../../../../assets/icons/CheckIconTwo';
import ChevronBottomIcon from '../../../../assets/icons/ChevronBottomIcon';
import ChevronBottomIconTwo from '../../../../assets/icons/ChevronBottomIconTwo';
import {VOLUNTEERS_DATA} from '../../../utils/data';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import CustomButton from '../../../components/reuseable-components/CustomButton';

const GenderScreen = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const handleSelectItem = (item: string) => {
    if (selectedItem?.includes(item)) {
      setSelectedItem('');
    } else {
      setSelectedItem(item);
    }
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
        <View style={{gap: 10, borderRadius: 12}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {['Male', 'Female'].map((item: any) => (
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
                key={item?._id}
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
        </View>
      </View>
      <View style={{width: '100%', alignItems: 'flex-end'}}>
        <CustomButton
          isDisabled={selectedItem === ''}
          extraStyles={{width: 77}}
          onPress={() =>
            navigation.navigate('CreateProfileScreen', {gender: selectedItem})
          }>
          Done
        </CustomButton>
      </View>
    </View>
  );
};

export default GenderScreen;
