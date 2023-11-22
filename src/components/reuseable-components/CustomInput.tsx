import {useState} from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {primaryColor, redColor, secondaryTextColor} from '../../utils/colors';
import HidePasswordIcon from '../../../assets/icons/HidePasswordIcon';
import {verticalScale} from '../../utils/metrics';
import WarnIcon from '../../../assets/icons/WarnIcon';
import {globalStlyes} from '../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomError from './CustomError';

interface Props {
  label: string;
  placeholder?: string;
  isShowPasswordIcon?: boolean;
  value?: any;
  error?: string;
  touched?: boolean | undefined;
  initialTouched?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  extraStyles?: any;
  isDisable?: boolean;
  isTextArea?: boolean;
  handleChange: (e: any) => void;
}

const {width, height} = Dimensions.get('screen');

const CustomInput = ({...props}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const isError =
    props.error &&
    ((props.touched && !props.value) ||
      (props.error && props.value) ||
      isFocused);

  const handleChangeText = (text: string) => {
    if (props.handleChange) {
      props.handleChange(text);
    }
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };
  return (
    <View style={{position: 'relative'}}>
      <Text
        style={{
          color: secondaryTextColor,
          fontFamily: 'SpaceGrotesk-Medium',
          fontSize: width * 0.038,
        }}>
        {props.label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderBottomColor: isError ? redColor : '#EDEDED',
            backgroundColor: props.isDisable ? '#EDEDED' : undefined,
            marginTop: props.isDisable ? 10 : undefined,
            paddingTop: props.isDisable ? 14 : undefined,

          },
          props.extraStyles,
        ]}
        editable={!props.isDisable}
        placeholderTextColor="rgba(22, 26, 29, 0.3)"
        textAlignVertical="top"
        placeholder={props?.placeholder ? props?.placeholder : 'Type here'}
        secureTextEntry={props.isShowPasswordIcon && !isShowPassword}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        value={props.value}
        maxLength={120}
        onChangeText={handleChangeText}
        onFocus={handleInputFocus}
        multiline={props?.isTextArea ? true : false}
      />
      {props?.isShowPasswordIcon && (
        <TouchableOpacity
          style={{position: 'absolute', right: 10, bottom: 36}}
          onPress={() => setIsShowPassword(!isShowPassword)}>
          {isShowPassword ? (
            <Icon name="eye-outline" size={18} color="#CDCDCF" />
          ) : (
            <HidePasswordIcon />
          )}
        </TouchableOpacity>
      )}
      {props.isTextArea && (
        <View style={{position: 'absolute', bottom: 30, right: 6}}>
          <Text style={[globalStlyes.text12, {color: primaryColor}]}>
            {props.value.length} / 120
          </Text>
        </View>
      )}

      {isError ? (
        <CustomError error={props.error as string} />
      ) : (
        <View style={{height: 24}} />
      )}
    </View>
  );
};

export default CustomInput;

export const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    color: 'rgba(22, 26, 29, 0.9)',
    fontWeight: '400',
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    paddingRight: 30,
    borderRadius: 12,
  },
});