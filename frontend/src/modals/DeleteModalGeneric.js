import React from 'react';
import GenericModal from './GenericModal';
import { useToast } from '../contexts/ToastProvider';
import { responseRequestHelper } from '../utils/requestHelper';

const DeleteModalGeneric = ({ handleClose, endpoint, action, type }) => {
  const {addToast} = useToast();
  
  const handleDelete = async () => {
    await responseRequestHelper(async () => {
      return await fetch(`http://localhost:8000/${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    }, async () => {
      handleClose();
    }, 'Account Deleted Successfully', addToast)}
        
    return (
        <>
          <GenericModal
          handleClose={handleClose}
          title={`Delete ${type}t`}
          actionText={`Delete ${type}`}
          actionFunction={handleDelete}
          />
        </>
    );
};

export default DeleteModalGeneric;