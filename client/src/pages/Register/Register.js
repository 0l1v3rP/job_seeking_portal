import React from 'react'
import '../../App.css' ;
import './Register.css'
import { useState, useEffect } from 'react';
import FormField from './FormField';
import CountryFormField from './CountryFormField'
;
const Register = () => {
    const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    password: '',
    country: '',
    state: '',
    zip: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    password: '',
    country: '',
    state: '',
    zip: '',
  });

  const validateInput = (name, value) => {
    let error;
    if(name === "country"){
      error = !value ? 'Please select a country from the list' : '';
    } else{
      error = !value.trim() ? 'This field is required' : '';
    }
    if(!error){
      switch (name) {
        case 'password':
          error = value.length < 7 ? 'pswd should be at leas 6 chars long' : '';
          break;
        case 'email':
          error = !isValidEmail(value) ? 'Invalid email format' : '';
          break;
        case 'zip':
          error = !isValidZip(value) ? 'Invalid zip code' : '';
          break;
        default:
          break;
      }
    }
    setFormErrors(prevFormErrors => ({
      ...prevFormErrors,
      [name]: error,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidZip = (zip) => {
    const zipRegex = /^\d{5}(?:-\d{4})?$/;
    return zipRegex.test(zip);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    Object.entries(formData).forEach(i => validateInput(i[0], i[1]));
  }

  const registerUser = async () => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
      } else {
        console.log('Registration successful!');
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  }

  useEffect(() => {
    const hasErrors = Object.values(formErrors).some(error => error !== '');
    if (!hasErrors) {
      console.log('Form submitted successfully!');
      registerUser();
    } else {
      clearForm();
      console.log('Form has validation errors. Please correct them.');
    }
  }, [formErrors]);

  const clearForm = () => {
    setFormData(prevFormData => {
      const newFormData = { ...prevFormData };
      Object.keys(newFormData).forEach(key => {
        newFormData[key] = '';
      });
      return newFormData;
    });
  }
  
  return (
    <div className='register-form'>
      <p className='Title'>MAKE YOUR REGISTRATION</p>
      <div className="row g-3 register">   

        <FormField
          label="First name"
          name="firstName"
          type="text"
          value={formData.firstName}
          error={formErrors.firstName}
          onChange={(e) => handleInputChange(e)}
        />

        <FormField
          label="Last name"
          name="lastName"
          type="text"
          value={formData.lastName}
          error={formErrors.lastName}
          onChange={(e) => handleInputChange(e)}
        />

        <FormField
          label="Username"
          name="username"
          type="text"
          value={formData.username}
          error={formErrors.username}
          onChange={(e) => handleInputChange(e)}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          error={formErrors.password}
          onChange={(e) => handleInputChange(e)}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          error={formErrors.email}
          onChange={(e) => handleInputChange(e)}
        />

        <FormField
          label="Address"
          name="address"
          type="text"
          value={formData.address}
          error={formErrors.address}
          onChange={(e) => handleInputChange(e)}
        />

        <CountryFormField
          value={formData.country}
          error={formErrors.country }
          onChange={(e) => handleInputChange(e)}
        />

        <FormField
          label="zip Code"
          name="zip"
          type="text"
          value={formData.zip}
          error={formErrors.zip}
          onChange={(e) => handleInputChange(e)}
        />

      </div> 
      <br/>
      <button className="btn-register" onClick={() => handleSubmit()}>Register</button>
    </div>
  );
}

export default Register