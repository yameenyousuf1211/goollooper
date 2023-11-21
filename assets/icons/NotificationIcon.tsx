import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

const NotificationIcon = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.02 2.91016C8.70997 2.91016 6.01997 5.60016 6.01997 8.91016V11.8002C6.01997 12.4102 5.75997 13.3402 5.44997 13.8602L4.29997 15.7702C3.58997 16.9502 4.07997 18.2602 5.37997 18.7002C9.68997 20.1402 14.34 20.1402 18.65 18.7002C19.86 18.3002 20.39 16.8702 19.73 15.7702L18.58 13.8602C18.28 13.3402 18.02 12.4102 18.02 11.8002V8.91016C18.02 5.61016 15.32 2.91016 12.02 2.91016Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <Path
        d="M13.87 3.19945C13.56 3.10945 13.24 3.03945 12.91 2.99945C11.95 2.87945 11.03 2.94945 10.17 3.19945C10.46 2.45945 11.18 1.93945 12.02 1.93945C12.86 1.93945 13.58 2.45945 13.87 3.19945Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.02 19.0586C15.02 20.7086 13.67 22.0586 12.02 22.0586C11.2 22.0586 10.44 21.7186 9.90002 21.1786C9.36002 20.6386 9.02002 19.8786 9.02002 19.0586"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
      />
      <Circle cx="19.5" cy="3.5" r="3.5" fill="#FF0000" />
    </Svg>
  );
};

export default NotificationIcon;
