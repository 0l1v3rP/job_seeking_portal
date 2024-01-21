import React from 'react';
import {useAuth, SetSignInState, setCompanyStatusState} from '../contexts/AuthProvider';
import GenericModal from './GenericModal';
import { companyStatusEnum } from '../utils/constants/companyStatus';
import { useToast } from '../contexts/ToastProvider';
import { responseRequestHelper } from '../utils/requestHelper';

const SignOutModal = ({ handleClose }) => {
  const { setAuthState } = useAuth();
  const {addToast} = useToast();

  const handleSignOut = async () => {
    await responseRequestHelper(async () => {
      await fetch('http://localhost:8000/signout', {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
          },
          credentials: 'include',
        });
    }, async () => {
      SetSignInState(setAuthState, false);
      setCompanyStatusState(setAuthState, companyStatusEnum.NONE);
    }, 'Siged out successfully', addToast)}

  return (
    <GenericModal
      handleClose={handleClose}
      title="Sign Out"
      actionText="Sign Out"
      actionFunction={handleSignOut}
    />
  );
};

export default SignOutModal
