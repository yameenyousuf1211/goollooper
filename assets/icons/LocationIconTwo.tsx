import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

const LocationIconTwo = () => {
  return (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <G clip-path="url(#clip0_6851_42940)">
        <Path
          d="M12.6 5.99961C12.6 10.1996 7.20005 13.7996 7.20005 13.7996C7.20005 13.7996 1.80005 10.1996 1.80005 5.99961C1.80005 4.56744 2.36898 3.19393 3.38167 2.18123C4.39437 1.16854 5.76788 0.599609 7.20005 0.599609C8.63222 0.599609 10.0057 1.16854 11.0184 2.18123C12.0311 3.19393 12.6 4.56744 12.6 5.99961Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M7.1999 7.79922C8.19401 7.79922 8.9999 6.99333 8.9999 5.99922C8.9999 5.00511 8.19401 4.19922 7.1999 4.19922C6.20579 4.19922 5.3999 5.00511 5.3999 5.99922C5.3999 6.99333 6.20579 7.79922 7.1999 7.79922Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6851_42940">
          <Rect width="14.4" height="14.4" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default LocationIconTwo;
