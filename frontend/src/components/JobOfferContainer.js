import React from 'react'
import './JobOfferContainer.css'
function JobOfferContainer({title, location, typeOfWork, sum, companyName,image}) {
  return (
    <div className="container">
        <div className='textContainer'> 
          <h3 className='h3color'>{title}</h3>
          <p>{companyName}</p>
          <p>{location} ({typeOfWork})</p>
          <p>{sum}</p>
        </div>
        <div className='imgContainer' >
          <img className='imgJobOffer' src={image} alt='...'></img>
        </div>
    </div>
  )
}

export default JobOfferContainer
