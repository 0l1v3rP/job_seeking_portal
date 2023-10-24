import React from 'react'

function JobOffer() {
  return (

    <div class="col-md-8">
      <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0">Looking for a welder</h3>
          <div class="mb-1 text-body-secondary">Nov 11</div>
        <p class="mb-auto">We are looking for a welder to weld stuff, if you know how to do it then come to us!!!!.</p>
        </div>
        <div class="col-auto d-none d-lg-block">
            <img src='./images/welding.jpg' style={{width:180, height:180}}></img>
        </div>
      </div>
    </div>
  
  )
}

export default JobOffer