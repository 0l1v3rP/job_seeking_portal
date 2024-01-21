import React from 'react';
import './SearchBar.css';
function SearchBar() {
  const searchInputs = [
    { id: 'searchInput', label: 'Position, keyword, or company', placeholder: 'e.g. Descartes' },
    { id: 'locationInput', label: 'Location', placeholder: 'e.g. Zilina' }
  ];

  const inputStyle = {
      fontSize: 13,
        fontWeight: 'bold' 
  }

  return (
    <div className="row d-flex justify-content-center searchContainer">
      {searchInputs.map((input, index) => (
        <div key={index} className="col-sm-5 searchBarInput">
          <label htmlFor={input.id} style={inputStyle}>{input.label}</label>
          <input type="text" id={input.id} className="form-control search" placeholder={input.placeholder} />
        </div>
      ))}
      <div className="col-sm-2 col-md-auto mt-auto">
        <button className="btn btn-search">Search</button>
      </div>
    </div>
  );
}

export default SearchBar