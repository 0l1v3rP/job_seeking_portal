 import React from 'react';
import JobOfferContainer from '../../components/JobOfferContainer';
import './JobOffers.css';
import { useAuth } from '../../contexts/AuthProvider';
import { useEffect, useState } from 'react';
import ControlTab from './ControlTab';

function JobOffers() {
    const { authState } = useAuth();
    

  useEffect(() => {
    if (authState.isSignedIn !== null) {
      
    }
  }, [authState.isSignedIn]);

  if (authState.isSignedIn === null || authState.companyStatus === null ) {
    return ;
  }
  
  return (
    <>
    <br/>
        <ControlTab companyStatus={authState.companyStatus}/>
        
    </>
  )
}

export default JobOffers