import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {globalStlyes} from '../../../../styles/GlobalStyles';
import {STATE} from '../../../../utils/data';
import {TouchableOpacity} from 'react-native';
import {primaryColor} from '../../../../utils/colors';
import CheckIconTwo from '../../../../../assets/icons/CheckIconTwo';
import CustomButton from '../../../../components/reuseable-components/CustomButton';

const StateScreen = ({navigation}: any) => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectOption = (name: string) => {
    if (selectedOption === name) {
      setSelectedOption('');
    } else {
      setSelectedOption(name);
    }
  };

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
        <View style={{gap: 32}}>
          <Text style={globalStlyes.text14}>Select State</Text>
          <View style={{gap: 12}}>
            {STATE.map((item: any) => {
              let isSelected = selectedOption.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.itemContainer}
                  onPress={() => handleSelectOption(item.id)}>
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        borderWidth: isSelected ? 0 : 1,
                        borderColor: '#B9BABB',
                        backgroundColor: isSelected
                          ? primaryColor
                          : 'transparent',
                      },
                    ]}>
                    <CheckIconTwo />
                  </View>
                  <Text
                    style={[
                      globalStlyes.text14,
                      {
                        color: isSelected ? '#161A1D' : '#B9BABB',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={[styles.buttonContainer]}>
          <CustomButton
            isDisabled={selectedOption === ''}
            extraStyles={{width: 77}}
            onPress={() => navigation.navigate('CreateProfileScreen')}>
            Done
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default StateScreen;

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
