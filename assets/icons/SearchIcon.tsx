import React from 'react';
import {Path, Svg} from 'react-native-svg';

const SearchIcon = () => {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.3833 12.876C7.76953 12.876 9.04785 12.4277 10.0938 11.6807L14.0283 15.6152C14.2109 15.7979 14.4517 15.8892 14.709 15.8892C15.2485 15.8892 15.6304 15.4741 15.6304 14.9429C15.6304 14.6938 15.5474 14.4531 15.3647 14.2788L11.4551 10.3608C12.2769 9.28174 12.7666 7.94531 12.7666 6.49268C12.7666 2.98145 9.89453 0.109375 6.3833 0.109375C2.88037 0.109375 0 2.97314 0 6.49268C0 10.0039 2.87207 12.876 6.3833 12.876ZM6.3833 11.498C3.64404 11.498 1.37793 9.23193 1.37793 6.49268C1.37793 3.75342 3.64404 1.4873 6.3833 1.4873C9.12256 1.4873 11.3887 3.75342 11.3887 6.49268C11.3887 9.23193 9.12256 11.498 6.3833 11.498Z"
        fill="#3C3C43"
        fill-opacity="0.6"
      />
    </Svg>
  );
};

export default SearchIcon;
