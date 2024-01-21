
import React from 'react';
import JobOfferContainer from '../components/JobOfferContainer';
import { useEffect, useState } from 'react';


function JobList({action, setProp, actionName, endpoint, refresh, setRefresh}) {
    const [jobsData, setJobsData] = useState();

    const fetchData = async () => {
        await fetch(`http://localhost:8000/Jobs/${endpoint}`, {
            method:'GET',
            credentials: 'include'
        }).then(response => response.json())
        .then(jobs => {
            setJobsData(jobs);
        })
        .catch(error => console.error('Error fetching jobs:', error));
    };

    useEffect(() => {
      if(typeof jobsData === 'undefined') {
        fetchData();
     }
    }, []);

    if(refresh === true) {
        fetchData();
        setRefresh(false)
    }

  return (
    <>
        {typeof jobsData !== 'undefined' && jobsData.map((job) => (
            <JobOfferContainer key={job.jobId} job={job} action={action} setProp={setProp} actionName={actionName}/>
            ))}            
    </>
  )
}

export default JobList