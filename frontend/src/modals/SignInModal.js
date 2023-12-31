import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {useAuth ,SetSignInState, fetchCompanyStatusState } from '../components/AuthProvider';

const SignInModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthState} = useAuth();

  
  async function signIn() {
    try {
      const response = await fetch('http://localhost:8000/signin', {
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

      if (response.ok) {
        console.log('User Signed in successfully'); 
        SetSignInState(setAuthState, true);
        await fetchCompanyStatusState(setAuthState);
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('User Sign in failed:', errorData);
      }
    } catch (error) {
      console.error('An error occurred during user registration', error);
    }
  }

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
