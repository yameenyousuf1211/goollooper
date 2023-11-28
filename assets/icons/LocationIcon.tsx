import React from 'react';
import {G, Mask, Path, Svg} from 'react-native-svg';

const LocationIcon = () => {
  return (
    <Svg width="17" height="20" viewBox="0 0 17 20" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.25 6.5C7.285 6.5 6.5 7.285 6.5 8.251C6.5 9.216 7.285 10 8.25 10C9.215 10 10 9.216 10 8.251C10 7.285 9.215 6.5 8.25 6.5ZM8.25 11.5C6.458 11.5 5 10.043 5 8.251C5 6.458 6.458 5 8.25 5C10.042 5 11.5 6.458 11.5 8.251C11.5 10.043 10.042 11.5 8.25 11.5Z"
        fill="black"
      />
      <Mask
        id="mask0_7214_14575"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="17"
        height="20">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0H16.4995V19.5H0V0Z"
          fill="white"
        />
      </Mask>
      <G mask="url(#mask0_7214_14575)">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.25 1.5C4.528 1.5 1.5 4.557 1.5 8.313C1.5 13.092 7.124 17.748 8.25 17.996C9.376 17.747 15 13.091 15 8.313C15 4.557 11.972 1.5 8.25 1.5ZM8.25 19.5C6.456 19.5 0 13.948 0 8.313C0 3.729 3.701 0 8.25 0C12.799 0 16.5 3.729 16.5 8.313C16.5 13.948 10.044 19.5 8.25 19.5Z"
          fill="black"
        />
      </G>
    </Svg>
  );
};

export default LocationIcon;
