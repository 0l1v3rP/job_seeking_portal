import React from 'react';
import { useAuth } from '../components/AuthProvider';
import GenericModal from './GenericModal';

const DeleteModal = ({ handleClose }) => {
    const { setSignedIn } = useAuth();
    const handleDelete = async () => {
        const response = await fetch('http://localhost:8000/deleteaccount', {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            });

            if (response.ok) {
            console.log('Account deleted successfully'); 
            setSignedIn(false);
            } else {
            const errorData = await response.json();
            console.error('Account deletion failed:', errorData);
            }
        };

    return (
        <GenericModal
        handleClose={handleClose}
        title="Delete Account"
        actionText="Delete Account"
        actionFunction={handleDelete}
        />
    );
};

export default DeleteModal;