import React from 'react';
import SearchBar from '../components/SearchBar';
import JobOffer from '../components/JobOffer';
import Dropdown from '../components/Dropdown';
import './Jobs.css';
import { useAuth } from '../components/AuthProvider';
import { useEffect, useState } from 'react';


function Jobs() {
  const { isSignedIn } = useAuth();
  const [jobsData, setJobsData] = useState({
    title: '',
    companyName: '',
    location: '',
    arrangement: '',
    hourlyPay: '',
    employement: '',
    description: ''
  });

  useEffect(() => {
    fetch('http://localhost:8000/getJobs', {
      credentials: 'include'
    })
  },[])

  if (isSignedIn === null) {
    return ;
  }
  
  return (
    <div>
        <br/>
        <br/>
        <br/>
        <SearchBar/>
        <br/>
        <div className='row g-5'>        
            <div className='col-md-5 col-lg-4 order-md first'>
              <Dropdown/>
            </div>
            <div className='col-md-7 col-lg-8'>
            {/* <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />               */}
            </div>
        </div>
     </div>
  )
}

export default Jobs