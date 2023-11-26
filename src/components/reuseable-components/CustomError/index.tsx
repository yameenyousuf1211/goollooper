import React from 'react';
import {Text, View} from 'react-native';
import WarnIcon from '../../../../assets/icons/WarnIcon';
import {globalStlyes} from '../../../styles/GlobalStyles';
import {verticalScale} from '../../../utils/metrics';
import { redColor } from '../../../utils/colors';

interface Props {
  error: string;
}

const CustomError = ({error}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: verticalScale(6),
        marginRight: 18,
      }}>
      <WarnIcon />
      <Text
        style={[
          globalStlyes.text12,
          {fontFamily: 'SpaceGrotesk-Medium', color: redColor},
        ]}>
        {error}
      </Text>
    </View>
  );
};

export default CustomError;
