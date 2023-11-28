import React from 'react';
import {Circle, Svg} from 'react-native-svg';

const DotIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Circle cx="5" cy="12" r="2" fill="#161A1D" />
      <Circle cx="12" cy="12" r="2" fill="#161A1D" />
      <Circle cx="19" cy="12" r="2" fill="#161A1D" />
    </Svg>
  );
};

export default DotIcon;
