import React from 'react';
import SearchBar from '../../components/SearchBar';
import JobOfferContainer from '../../components/JobOfferContainer';
import Dropdown from '../../components/Dropdown';
import './AvailableJobs.css';
import { useAuth } from '../../contexts/AuthProvider';
import { useEffect, useState } from 'react';
import ApplyForJobModal from '../../modals/ApplyForJobModal';
import { useToast } from '../../contexts/ToastProvider';

function AvailableJobs() {
  const { authState } = useAuth();
  const [jobsData, setJobsData] = useState();
  const[jobId, setJobId] = useState();
    const setJobIdProp = (job) => {setJobId(job.jobId)};

  const [showApplyForJob, setApplyForJob] = useState(false);
  const openShowDApplyForJob = () => setApplyForJob(true);
  const closeShowApplyForJob = () => setApplyForJob(false);



  const fetchData = async () => {
      await fetch('http://localhost:8000/Jobs/getJobs', {
        credentials: 'include'
      }).then(response => response.json())
      .then(jobs => setJobsData(jobs))
      .catch(error => console.error('Error fetching jobs:', error));
  };

useEffect(()=> {
    if(typeof jobsData === 'undefined' && authState.isSignedIn !== null) {
      fetchData();
   }
}, [])

if (authState.isSignedIn === null) {
  return;
}

  
  return (
    <>
      <div className='layout'>
          <br/>
          <br/>
          <br/>
          <SearchBar/>
          <br/>
          <div className='row d-flex justify-content-center' >        
            <div className='col-md-4 col-lg-4 order-md first'>
              <Dropdown/>
            </div>
            <div className='col-md-8 col-lg-8'>
            {typeof jobsData !== 'undefined' && jobsData.map((job) => (
              <JobOfferContainer key={job.jobId}jobId job={job} action={authState.isSignedIn ? openShowDApplyForJob: undefined } setProp={setJobIdProp} actionName={'Apply'}/>
              ))}            
            </div>
          </div>
      </div>
      {showApplyForJob && <ApplyForJobModal handleClose={closeShowApplyForJob} id={jobId} refreshFunction={fetchData}/>}
      </>
  )
}

export default AvailableJobs