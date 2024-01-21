import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, title, severity) => {
    const newToast = (
      <Toast bg={severity} key={Date.now()} onClose={() => removeToast(newToast)}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    );

    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => removeToast(newToast), 5000);
  };

  const removeToast = (toastToRemove) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast !== toastToRemove));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
