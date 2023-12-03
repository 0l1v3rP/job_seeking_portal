import React from 'react';
import SearchBar from '../components/SearchBar';
import JobOffer from '../components/JobOffer';
import Dropdown from '../components/Dropdown';
import './Jobs.css';


function Jobs() {
  const jobData = {
    title: 'Looking for a welder',
    companyName: 'Lovakia Welding',
    location: 'Zilina job with occasional home office',
    typeOfWork: 'Full-time', // Adjust this according to your data
    sum: '2000 eur',
    image: './images/welding.jpg', // Adjust the image path based on your file structure
  };

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
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              
            <JobOffer {...jobData} />              


            </div>
        </div>
     </div>
  )
}

export default Jobs