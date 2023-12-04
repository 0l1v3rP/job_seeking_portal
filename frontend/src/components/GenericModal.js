import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useAuth } from '../components/AuthProvider';

const GenericModal = ({ handleClose, title, actionText, actionFunction }) => {
  const { setSignedIn } = useAuth();

  const handleAction = async () => {
    try {
      await actionFunction();
      handleClose();
    } catch (error) {
      console.error('An error occurred during the action:', error);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'black' }}>Are you sure you want to {title.toLowerCase()}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAction}>
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenericModal;
