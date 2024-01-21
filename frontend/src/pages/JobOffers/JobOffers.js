 import React from 'react';
import './JobOffers.css';
import { useAuth } from '../../contexts/AuthProvider';
import { useEffect, useState } from 'react';
import ControlTab from './ControlTab';
import JobList from '../../components/JobList';

function JobOffers() {
    const [selectedTab, setSelectedTab] = useState('myJobs');
    const { authState } = useAuth();
    const[job, setJob] = useState();
    const[refresh, setRefresh] = useState();
    
    const setJobProp = (job) => {setJob(job)};
  

  if (authState.isSignedIn === null || authState.companyStatus === null ) {
    return ;
  }
  
  return (
    <>
    <br/>
        <ControlTab companyStatus={authState.companyStatus} selectedTab={selectedTab} setSelectedTab={setSelectedTab} setRefresh={setRefresh}/>
        {selectedTab === 'company' && 
        (
          <JobList setProp={setJobProp} endpoint={'companyJobs'} refresh={refresh} setRefresh={setRefresh}/>
        )}
    </>
  )
}

export default JobOffers