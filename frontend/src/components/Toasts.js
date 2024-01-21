import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useToast } from '../contexts/ToastProvider';

function Toasts() {
  const { toasts } = useToast();

  return (
    <ToastContainer className="position-fixed top-0 end-0 p-3">
      {toasts.map((toast) => toast)}
    </ToastContainer>
  );
}

export default Toasts;
