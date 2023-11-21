import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, redColor, secondaryTextColor} from '../../utils/colors';
import {globalStlyes} from '../../styles/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import CustomError from './CustomError';
import ChevronRightIconTwo from '../../../assets/icons/ChevronRightIconTwo';
import ChevronRightIcon from '../../../assets/icons/ChevronRightIcon';

const {width, height} = Dimensions.get('screen');

interface Props {
  label: string;
  placeholder: string;
  value: any;
  touched: any;
  error: any;
  route: string;
  isSingleItem?: boolean;
}

const CustomSelect = ({
  label,
  placeholder,
  value,
  touched,
  error,
  route,
  isSingleItem = false,
}: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
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
        }}>
          <View style={{position: 'absolute',right: 10,bottom:16}}>
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
            value?.map((value: string) => (
              <View
                style={{
                  backgroundColor: primaryColor,
                  padding: 10,
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    color: 'white',
                  }}>
                  {value}
                </Text>
              </View>
            ))
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
