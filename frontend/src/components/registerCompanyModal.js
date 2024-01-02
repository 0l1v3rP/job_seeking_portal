import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useAuth } from './AuthProvider';

const RegisterCompanyModal = ({ show, handleClose }) => {
  const [companyData, setCompanyData] = useState({
    title: '',
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
    try {
      const formData = new FormData();
      formData.append('title', companyData.title);
      formData.append('description', companyData.description);
      formData.append('imageFile', companyData.imageFile);

      const response = await fetch('http://localhost:8000/register-company', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
          },
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        console.log('Company registered successfully');
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Company registration failed:', errorData);
      }
    } catch (error) {
      console.error('An error occurred during company registration', error);
    }
  };

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
              placeholder="Enter company title"
              name="title"
              value={companyData.title}
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
