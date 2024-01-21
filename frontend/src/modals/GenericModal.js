import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { responseRequestHelper } from '../utils/requestHelper';

const GenericModal = ({handleClose, title, actionText, actionFunction }) => {
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
        <Button variant="primary" onClick={actionFunction}>
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenericModal;
