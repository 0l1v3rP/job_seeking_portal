import React from 'react'
import '../../App.css' ;
import './UserForm.css'
import { useState, useEffect } from 'react';
import FormField from './FormField';
import CountryFormField from './CountryFormField';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../components/AuthProvider';

const UserForm = () => {
  const { isSignedIn } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    ...(!isSignedIn && {
      email: '',
      password: '',
    }),
    address: '',
    password: '',
    country: '',
    zip: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    ...(!isSignedIn && {
       email: '',
       password: '',
     }),
    address: '',
    country: '',
    zip: '',
  });

  useEffect(() => {
    if (isSignedIn) {
      setFormErrors((prevErrors) => {
        const { email, password, ...rest } = prevErrors;
        return rest;
      });
      setFormData((prevData) => {
        const { email, password, ...rest } = prevData;
        return rest;
      });
    }
  }, [isSignedIn]);

  const[formSubmitted, setFormSubmitted] = useState(false);

  const validateInput = (name, value) => {
    if(isSignedIn && (name === 'email' || name === 'password') ) return;
    let error;
    if(name === "country"){
      error = !value ? 'Please select a country from the list' : '';
    } else{
      error = !value.trim() ? 'This field is required' : '';
    }
    if(!error){
      switch (name) {
        case 'password':
          error = value.length < 6 ? 'pswd should be at least 6 chars long' : '';
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
    setFormSubmitted(true);
  }
  useEffect(() => {
    if(isSignedIn) {
        fetch('http://localhost:8000/getmyaccount', {
          credentials: 'include'
        })
        .then(response => response.json())
        .then(userObj => {
          setFormData(prevData => ({
            ...prevData,
            firstName: userObj.user.firstname || '',
            lastName: userObj.user.lastname || '',
            username: userObj.user.username || '',
            address: userObj.user.address || '',
            country: userObj.user.country || '',
            zip: userObj.user.zip || '',
          }));
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (formSubmitted) {
      const hasErrors = Object.values(formErrors).some(error => error !== '');
      if (!hasErrors) {
        console.log('Form submitted successfully!');
        if (isSignedIn) {
          updateUser();
        } else{
          registerUser();
        }
        setFormSubmitted(false);
      } else {
        console.log('Form has validation errors. Please correct them.');
      }
    }
  }, [formErrors]);
  
  //not in use
  const clearForm = () => {
    setFormData(prevFormData => {
      const newFormData = { ...prevFormData };
      Object.keys(newFormData).forEach(key => {
        newFormData[key] = '';
      });
      return newFormData;
    });
  }

  const performUserAction = async (endpoint, successMessage, method) => {
    try {
      const response = await fetch(`http://localhost:8000/${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log(successMessage);
        navigate('/');
      } else {
        const errorData = await response.json();
        console.error(`User action failed for ${endpoint}:`, errorData);
      }
    } catch (error) {
      console.error(`An error occurred during user action for ${endpoint}`, error);
    }
  };
  
  const updateUser = async () => {
    await performUserAction('editaccount', 'User edit successfully', 'PUT');
  };
  
  const registerUser = async () => {
    await performUserAction('register', 'User registered successfully', 'POST');
  };
  
  if (isSignedIn === null) {
    return ;
  }

  return (
    <div className='register-form'>
      <p className='Title'>MAKE YOUR REGISTRATION UPDATE</p>
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
      {!isSignedIn &&
        <>
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
        </>
      }

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
      <button className="btn-register" onClick={() => handleSubmit()}>{isSignedIn ? 'Update': 'Register'}</button>
    </div>
  );
}

export default UserForm