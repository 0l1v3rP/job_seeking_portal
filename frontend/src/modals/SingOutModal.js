import React from 'react';
import {useAuth, SetSignInState, setCompanyStatusState} from '../components/AuthProvider';
import GenericModal from './GenericModal';
import { companyStatusEnum } from '../utils/constants/companyStatus';

const SignOutModal = ({ handleClose }) => {
  const { setAuthState } = useAuth();
  const handleSignOut = async () => {
    const response = await fetch('http://localhost:8000/signout', {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
          },
          credentials: 'include',
        });
  
        if (response.ok) {
          console.log('User Signed out successfully'); 
          SetSignInState(setAuthState, false);
          setCompanyStatusState(setAuthState, companyStatusEnum.NONE);
        } else {
          const errorData = await response.json();
          console.error('User Sign out failed:', errorData);
        }
    };

  return (
    <GenericModal
      handleClose={handleClose}
      title="Sign Out"
      actionText="Sign Out"
      actionFunction={handleSignOut}
    />
  );
};

export default SignOutModal;
