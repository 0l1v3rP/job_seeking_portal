import {React, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useToast } from '../contexts/ToastProvider';
import { responseRequestHelper } from '../utils/requestHelper';

const ApplyForJobModal = ({ handleClose, id, setRefresh}) => {
  const [resume, setResume] = useState();
  const [show, setShow] = useState(true);
  const {addToast} = useToast();

  const handleAction = async () => {
    await responseRequestHelper(async () => {
      return await fetch(`http://localhost:8000/Application/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({resume, jobId:id}),
      });
      }, async () => {
        setShow(false);
        setRefresh(true);
      }, 'Applied successfully', addToast)}

  return (
    <Modal show={show} onHide={handleClose}>
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
            onChange={(e) => setResume(e.target.value)}
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
