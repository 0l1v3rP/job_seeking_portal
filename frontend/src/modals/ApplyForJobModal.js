import {React,  useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ApplyForJobModal = ({ handleClose, id}) => {
  const [resume] = useState();

  const handleAction = async () => {
    await fetch(`http://localhost:8000/application/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(resume, id),
    });
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write a reson why You applied for this job"
            name=""
            value={resume}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAction}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApplyForJobModal;
