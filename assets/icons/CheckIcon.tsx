import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface Props {
  fill?: string;
}

const CheckIcon = ({fill}: Props) => {
  return (
    <Svg width="22" height="26" viewBox="0 0 17 13" fill={fill ? fill : 'none'}>
      <Path
        d="M2 6.47713L6.12497 11L15 2"
        stroke="#FFC107"
        stroke-width="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
