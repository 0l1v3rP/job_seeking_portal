import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useAuth ,SetSignInState, fetchCompanyStatusState } from '../contexts/AuthProvider';
import { useToast } from '../contexts/ToastProvider';
import { responseRequestHelper } from '../utils/requestHelper';

const SignInModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthState} = useAuth();
  const {addToast} = useToast();

 const signIn = async () => {
    await responseRequestHelper(async () => {
      return await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          email: email,
          password: password
        })
      });
    }, async () => {
      SetSignInState(setAuthState, true);
      await fetchCompanyStatusState(setAuthState);
      handleClose();
    }, 'Signed in successfully', addToast)}


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"    
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={signIn}>
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignInModal;
