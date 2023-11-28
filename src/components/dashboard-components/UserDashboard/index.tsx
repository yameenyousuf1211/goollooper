import React from 'react';
import ServiceInterests from './ServiceInterests';
import MatchedProviders from './MatchedProviders';
import {INTERESTS, MATCHED_SERVICE_PROVIDERS} from '../../../utils/data';

const UserDashboard = () => {
  return (
    <>
      <ServiceInterests interest={INTERESTS} />
      <MatchedProviders providers={MATCHED_SERVICE_PROVIDERS} />
    </>
  );
};

export default UserDashboard;
