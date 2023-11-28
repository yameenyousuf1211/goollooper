import React, {ReactNode} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {primaryColor} from '../../../utils/colors';

interface Props {
  children: ReactNode;
  isDisabled?: boolean;
  extraStyles?: any;
  onPress?: () => void;
  extraTextStyles?: any;
  testID?: string;
}

const CustomButton = ({
  children,
  extraStyles,
  isDisabled,
  onPress,
  extraTextStyles,
  testID,
}: Props) => {
  return (
    <Pressable
      testID={testID}
      style={({pressed}) => pressed && styles.pressed}
      onPress={onPress}
      disabled={isDisabled}>
      <View
        style={[
          styles.button,
          {backgroundColor: isDisabled ? '#F9C583' : primaryColor},
          extraStyles,
        ]}>
        <Text
          style={[
            styles.buttonText,
            isDisabled && styles.disabledButtonText,
            extraTextStyles,
          ]}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    // backgroundColor: primaryColor,
    width: '100%',
    height: 40,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 14,
  },
  disabledButtonText: {
    color: 'white',
  },
  pressed: {
    opacity: 0.75,
  },
});
