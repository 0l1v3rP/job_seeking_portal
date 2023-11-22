import React from 'react'
function BestEmployeers() {
  const images = [
    "./logos/01.png",
    "./logos/02.jpeg",
    "./logos/03.png",
    "./logos/04.png",
    "./logos/06.png",
    "./logos/07.jpeg",
    "./logos/08.png",
    "./logos/09.png",
    "./logos/10.jpeg"
  ];
  
  const style = {
    paddingLeft: 20,
    paddingRight: 20,
  };
  return (
    <div className="row d-flex align-items-center" style={style}>
      {images.map((image, index) => (
        <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-2 mb-lg-0">
          <img src={image} className="w-100 rounded mb-4" alt={`Logo ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default BestEmployeers