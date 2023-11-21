import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {primaryColor} from '../../../utils/colors';
import ChevronBottomIconTwo from '../../../../assets/icons/ChevronBottomIconTwo';
import {
  SERVICE_PROVIDERS_SPECIALITY,
  VOLUNTEERS_DATA,
} from '../../../utils/data';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import CustomButton from '../../../components/reuseable-components/CustomButton';

const SPSpeciality = ({navigation, route}: any) => {
  const [activeItemId, setActiveItemId] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelectItem = (item: string) => {
    if (selectedItems?.includes(item)) {
      const filteredItems = selectedItems?.filter(
        deleteItem => deleteItem !== item,
      );
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };
  return (
    <ScrollView>
      <View
        style={[
          globalStlyes.container,
          {
            padding: 20,
            justifyContent: 'space-between',
            paddingTop: 20,
            alignItems: 'flex-start',
          },
        ]}>
        <Text style={[globalStlyes.text14]}>Select Tasks Interests</Text>
        <View
          style={{
            marginTop: 10,
          }}>
          <View style={{gap: 10, borderRadius: 12}}>
            {SERVICE_PROVIDERS_SPECIALITY.map(data => (
              <TouchableOpacity
                onPress={() =>
                  activeItemId === data?._id
                    ? setActiveItemId('')
                    : setActiveItemId(data?._id)
                }
                style={{
                  backgroundColor: '#F2F2F2',
                  borderRadius: 12,
                  padding: 16,
                  gap: 16,
                  width: 320,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={[
                      {
                        fontSize: 13,
                        color: '#1E1E1E',
                        fontFamily: 'SpaceGrotesk-Medium',
                      },
                    ]}>
                    {data.name}
                  </Text>
                  {activeItemId.includes(data?._id) ? (
                    <ChevronBottomIconTwo />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </View>
                {activeItemId.includes(data?._id) && data?.types && (
                  <View
                    style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                    {activeItemId.includes(data?._id) &&
                      data?.types?.map((item: any) => (
                        <TouchableOpacity
                          style={{
                            backgroundColor: selectedItems?.includes(item?.name)
                              ? primaryColor
                              : 'transparent',
                            borderWidth: 1,
                            borderColor: '#D9D9D9',
                            padding: 10,
                            borderRadius: 12,
                          }}
                          key={item?._id}
                          onPress={() => handleSelectItem(item?.name)}>
                          <Text
                            style={{
                              color: selectedItems?.includes(item?.name)
                                ? 'white'
                                : '#949494',
                            }}>
                            {item?.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            marginTop: 50,
          }}>
          <CustomButton
            isDisabled={selectedItems?.length === 0}
            extraStyles={{width: 77}}
            onPress={() => {
              navigation.navigate('CreateProfileScreen', {
                SPSpecialityItems: selectedItems,
              });
            }}>
            Done
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default SPSpeciality;
