import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, redColor, secondaryTextColor} from '../../../utils/colors';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import ChevronRightIconTwo from '../../../../assets/icons/ChevronRightIconTwo';
import ChevronRightIcon from '../../../../assets/icons/ChevronRightIcon';
import {IService, ISubService} from '../../../interfaces/user.interface';
import CustomError from '../CustomError';

const {width, height} = Dimensions.get('screen');

interface Props {
  label: string;
  placeholder: string;
  value: any | string;
  touched: any;
  error: string;
  route: string;
  isSingleItem?: boolean;
  isDisable?: boolean;
}

const CustomSelect = ({
  label,
  placeholder,
  value,
  touched,
  error,
  route,
  isSingleItem = false,
  isDisable
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={isDisable}
      onPress={() => navigation.navigate(route)}>
      <View
        style={{
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor:
            (error && touched && !value) || (error && value)
              ? redColor
              : '#EDEDED',
          paddingBottom: 16,
          position: 'relative',
          backgroundColor:  isDisable ? '#EDEDED' : undefined,
          borderRadius: isDisable ? 12 : 0,
          padding: isDisable ? 4 : 0
        }}>
        <View style={{position: 'absolute', right: 10, bottom: 16}}>
          <ChevronRightIcon />
        </View>
        <Text
          style={{
            color: secondaryTextColor,
            fontFamily: 'SpaceGrotesk-Medium',
            fontSize: width * 0.038,
          }}>
          {label}
        </Text>
        <View style={{flexWrap: 'wrap', flexDirection: 'row', gap: 6}}>
          {value !== '' && !isSingleItem ? (
            value?.map((item: IService) =>
              item.subServices.map((subItem: ISubService) => (
                <View
                  key={subItem._id}
                  style={{
                    backgroundColor: primaryColor,
                    padding: 10,
                    borderRadius: 12,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    {subItem.title}
                  </Text>
                </View>
              )),
            )
          ) : value !== '' && isSingleItem ? (
            <Text
              style={[
                {
                  fontSize: 14,
                  color: 'rgba(22, 26, 29, 0.9)',
                  fontFamily: 'SpaceGrotesk-Medium',
                },
              ]}>
              {value}
            </Text>
          ) : (
            <Text
              style={[globalStlyes.text14, {color: 'rgba(22, 26, 29, 0.3)'}]}>
              {placeholder}
            </Text>
          )}
        </View>
      </View>
      {(error && touched && !value) || (error && value) ? (
        <CustomError error={error as string} />
      ) : (
        <View style={{height: 24}} />
      )}
    </TouchableOpacity>
  );
};

export default CustomSelect;
