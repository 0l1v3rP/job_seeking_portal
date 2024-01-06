import React from 'react';
import GenericModal from './GenericModal';

const DeleteModalGeneric = ({ handleClose, endpoint, action, type }) => {
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            });

            if (response.ok) {
                console.log(`${type} deleted successfully`); 
                action();
            } else {
                const errorData = await response.json();
                console.error(`${type} deletion failed: `, errorData);
            }
        };
        
    return (
        <GenericModal
        handleClose={handleClose}
        title={`Delete ${type}t`}
        actionText={`Delete ${type}`}
        actionFunction={handleDelete}
        />
    );
};

export default DeleteModalGeneric;