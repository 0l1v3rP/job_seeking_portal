
import React from 'react';
import { useAuth } from '../components/AuthProvider';
import GenericModal from './GenericModal';

const SignOutModal = ({ handleClose }) => {
  const { setSignedIn } = useAuth();
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
          setSignedIn(false);
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
