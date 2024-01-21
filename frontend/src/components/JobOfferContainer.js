import React from 'react';
import './JobOfferContainer.css';
import { formatImgFromBuffer } from '../utils/imgHelper';

function JobOfferContainer({ job, action, setProp, actionName }) {
  const handleAction = () => {
    setProp(job);
    action();
  };

  const img = formatImgFromBuffer(job.company.file)
  return (
    <>
      <div className="container">
        <div className='textContainer'>
          <h3 className='h3color'>{job.title}</h3>
          <p>company: {job.company.name}</p>
          <p>location: {job.jobLocation} ({job.employementTypes})</p>
          <p>arrangement: {job.arrangements}</p>
          <p>pay: {job.hourlyPay}/h $</p>
          <div className='btnPair' >
            <button className="btn btn-secondary" >Details</button>
            {typeof action !== 'undefined' && <button className="btn btn-primary" onClick={handleAction}>{actionName}</button>}
          </div>
        </div>
        <div className='imgContainer'>
          <img className='imgJobOffer' src={img} alt='...'></img>
        </div>
      </div> 
    </>
  );
}

export default JobOfferContainer
