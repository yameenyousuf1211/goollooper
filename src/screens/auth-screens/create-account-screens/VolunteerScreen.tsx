import React, {useState, useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {primaryColor} from '../../../utils/colors';
import CheckIconTwo from '../../../../assets/icons/CheckIconTwo';
import ChevronBottomIcon from '../../../../assets/icons/ChevronBottomIcon';
import ChevronBottomIconTwo from '../../../../assets/icons/ChevronBottomIconTwo';
// import {VOLUNTEERS_item} from '../../../utils/item';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import CustomButton from '../../../components/reuseable-components/CustomButton';
import {verticalScale} from '../../../utils/metrics';
import {
  IService,
  IServiceData,
  ISubService,
  IUser,
} from '../../../interfaces/user.interface';
import useLoading from '../../../hooks/useLoading';
import {getServices} from '../../../api';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setUserData} from '../../../redux/AuthSlice';

const VolunteerScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [activeItemId, setActiveItemId] = useState<string>('');
  const [items, setItems] = useState<IService[]>([]);
  const [selectedItems, setSelectedItems] = useState<IService[]>([]);
  const {isLoading, startLoading, stopLoading} = useLoading();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        const services = response?.data?.data?.services;
        setItems(services);
      } catch (error: any) {
        console.log(error?.response?.data, 'ERROR FROM VOLUNTEER SCREEN!');
      }
    };
    fetchServices();
  }, []);

  const handleSelectItem = (item: IService) => {
    const filterItem = selectedItems.find(
      selectedItem => selectedItem._id === item._id,
    );
    if (filterItem) {
      const filteredItems = selectedItems.filter(
        selectedItem => selectedItem._id !== filterItem._id,
      );
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };
  console.log(selectedItems, 'selected');

  const handleSubmit = () => {
    const data: Partial<IUser> = {
      ...prevUserData,
      volunteer: selectedItems as any,
    };
    dispatch(setUserData(data as IUser));
    navigation.navigate('CreateProfileScreen', {
      volunteerItems: selectedItems,
    });
  };
  return (
    <ScrollView>
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
              <Text style={globalStlyes.text14}>Volunteer</Text>
            </View>
            <ChevronBottomIconTwo />
          </View>
          <View style={{gap: 10, borderRadius: 12}}>
            {items.map((item: IService) => (
              <TouchableOpacity
                onPress={() =>
                  activeItemId === item?._id
                    ? setActiveItemId('')
                    : setActiveItemId(item?._id)
                }
                style={{
                  backgroundColor: '#F2F2F2',
                  borderRadius: 12,
                  padding: 16,
                  gap: 16,
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
                    {item.title}
                  </Text>
                  {activeItemId.includes(item?._id) ? (
                    <ChevronBottomIconTwo />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </View>
                {activeItemId.includes(item?._id) && item?.subServices && (
                  <View
                    style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                    {activeItemId.includes(item?._id) &&
                      item?.subServices?.map((subItem: ISubService) => {
                        let isSelected = selectedItems.some(selectedItem =>
                          selectedItem.subServices.some(
                            (subService: any) => subService._id === subItem._id,
                          ),
                        );
                        return (
                          <TouchableOpacity
                            style={{
                              backgroundColor: isSelected
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
                                color: isSelected ? 'white' : '#949494',
                              }}>
                              {subItem?.title}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
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
            marginTop: verticalScale(140),
          }}>
          <CustomButton
            isDisabled={selectedItems?.length === 0}
            extraStyles={{width: 77}}
            onPress={handleSubmit}>
            Done
          </CustomButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default VolunteerScreen;
