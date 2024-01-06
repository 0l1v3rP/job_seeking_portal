import React from 'react';
import JobOfferContainer from '../../components/JobOfferContainer';
import './JobOffers.css';
import { useAuth } from '../../components/AuthProvider';
import { useEffect, useState } from 'react';


function JobOffers() {
    const { authState } = useAuth();
    const [jobsData, setJobsData] = useState({
    title: '',
    companyName: '',
    location: '',
    arrangement: '',
    hourlyPay: '',
    employement: '',
    description: ''
  });



  if (authState.isSignedIn === null || authState.companyStatus ) {
    return ;
  }
  
  return (
    <>
    </>
  )
}

export default JobOffers