import React from 'react';
import SearchBar from '../SearchBar';
import JobOffer from '../JobOffer';
import Dropdown from '../Dropdown';
import './Jobs.css';


function Jobs() {
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
              <JobOffer></JobOffer>
              <JobOffer></JobOffer>
              <JobOffer></JobOffer>
              <JobOffer></JobOffer>
              <JobOffer></JobOffer>
              <JobOffer></JobOffer>
            </div>
        </div>
     </div>
  )
}

export default Jobs