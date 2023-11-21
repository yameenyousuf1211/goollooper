import React from 'react';
import {AuthStack} from './AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {HomeTab} from './HomeTab';

export const Routes = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  if (isAuthenticated) return <HomeTab />;
  return <AuthStack />;
};
