import React from 'react';
import {Path, Svg} from 'react-native-svg';

interface Props {
  fill?: string;
}

const StarIcon = ({fill}: Props) => {
  return (
    <Svg width="16" height="15" viewBox="0 0 16 15" fill="none">
      <Path
        d="M15.5754 5.36142L10.6567 4.656L8.45208 0.24693C8.28741 -0.0823101 7.71208 -0.0823101 7.54741 0.24693L5.34342 4.656L0.424765 5.36142C0.0207661 5.41963 -0.140567 5.88094 0.142766 6.15322L3.71609 9.5921L2.87143 14.4537C2.80409 14.8399 3.24342 15.1297 3.60676 14.9401L8.00008 12.6604L12.3934 14.9407C12.7534 15.1285 13.1967 14.8443 13.1287 14.4543L12.2841 9.59272L15.8574 6.15385C16.1407 5.88094 15.9787 5.41963 15.5754 5.36142Z"
        fill={fill ? fill : '#FFC107'}
      />
    </Svg>
  );
};

export default StarIcon;
