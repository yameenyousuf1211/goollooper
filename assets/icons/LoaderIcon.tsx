import React from 'react';
import {Circle, Svg} from 'react-native-svg';

const LoaderIcon = () => {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Circle
        cx="11"
        cy="11"
        r="10.25"
        stroke="#65686A"
        stroke-width="1.5"
        stroke-dasharray="2 2"
      />
    </Svg>
  );
};

export default LoaderIcon;
