import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useToast } from '../contexts/ToastProvider';
import { responseRequestHelper } from '../utils/requestHelper';

const RegisterCompanyModal = ({ show, handleClose }) => {
  const {addToast} = useToast();

  const [companyData, setCompanyData] = useState({
    name: '',
    description: '',
    imageFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleRegister = async () => {
      const formData = new FormData();
      formData.append('name', companyData.name);
      formData.append('description', companyData.description);
      formData.append('imageFile', companyData.imageFile);              
      await responseRequestHelper(async () => {
        await fetch('http://localhost:8000/registerCompany', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });
      }, async () => {
        handleClose();
      }, 'Company Registered Successfuly', addToast)}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>You don't have any company registered, register company?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              name="name"
              value={companyData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter company description"
              name="description"
              value={companyData.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicImage">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="imageFile"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterCompanyModal;
