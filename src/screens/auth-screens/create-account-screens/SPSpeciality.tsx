import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {IService, ISubService, IUser} from '../../../interfaces/user.interface';
import useLoading from '../../../hooks/useLoading';
import {getServices} from '../../../api';
import {setUserData} from '../../../redux/AuthSlice';

const SPSpeciality = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const prevUserData = useSelector((state: RootState) => state.auth.user);
  const [activeItemId, setActiveItemId] = useState<string>('');
  const [items, setItems] = useState<IService[]>([]);
  const [selectedItems, setSelectedItems] = useState<IService[]>([]);
  const {isLoading, startLoading, stopLoading} = useLoading();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices('interest');
        const services = response?.data?.data?.services;
        setItems(services);
      } catch (error: any) {
        console.log(error?.response?.data, 'ERROR FROM VOLUNTEER SCREEN!');
      }
    };
    fetchServices();
    if (prevUserData?.services) {
      setSelectedItems(prevUserData.services as any);
    }
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

  const handleSubmit = () => {
    const data: Partial<IUser> = {
      ...prevUserData,
      services: selectedItems as any,
    };
    dispatch(setUserData(data as IUser));
    navigation.navigate('CreateProfileScreen');
  };
  return (
    <View
      style={[
        globalStlyes.container,
        {
          padding: 20,
          justifyContent: 'space-between',
          paddingTop: 20,
        },
      ]}>
      <View>
        <Text style={[globalStlyes.text14]}>Select Tasks Interests</Text>
        <View style={{gap: 10, borderRadius: 12, marginTop: 10}}>
          {items.map((item: IService) => (
            <TouchableOpacity
              key={item?._id}
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
                  {item.title}
                </Text>
                {activeItemId.includes(item?._id) ? (
                  <ChevronBottomIconTwo />
                ) : (
                  <ChevronRightIcon />
                )}
              </View>
              {activeItemId.includes(item?._id) && item?.subServices && (
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
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
                          key={subItem?._id}
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
          marginTop: 50,
        }}>
        <CustomButton
          isDisabled={selectedItems?.length === 0}
          extraStyles={{width: 77}}
          onPress={handleSubmit}>
          Done
        </CustomButton>
      </View>
    </View>
  );
};

export default SPSpeciality;
