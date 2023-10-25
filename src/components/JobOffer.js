import React from 'react'
import './JobOffer.css'
function JobOffer() {
  return (

<div className="container">
  
    <div className='textContainer'>
      <h3 className='h3color'>Looking for a welder</h3>
      <p>Slovakia welding</p>
      <p>Zilina (job with occasional home office)</p>
      <p>2000 eur</p>
    </div>
    <div className='imgContainer' >
      <img className='imgJobOffer' src='./images/welding.jpg' alt='...'></img>
    </div>
</div>
  )
}

export default JobOffer