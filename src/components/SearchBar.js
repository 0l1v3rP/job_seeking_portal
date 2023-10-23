import React from 'react';
import './SearchBar.css';
function SearchBar() {
  return (
    <div className="row d-flex  justify-content-center searchContainer">
        <div className="col-sm-5 searchBarInput" >
            <label htmlFor="searchInput" style={{ fontSize: 13, fontWeight:'bold' }}>Position, keyword, or company</label>
            <input type="text" id="searchInput" className="form-control search" placeholder="e.g. Descartes" />
        </div>
        <div className="col-sm-4 searchBarInput">
            <label htmlFor="locationInput" style={{ fontSize: 13, fontWeight:'bold' }}>Location</label>
            <input type="text" id="locationInput" className="form-control search" placeholder="e.g. Zilina" />
        </div>
        <div className="col-sm-1 mt-auto" >
            <button className="btn btn-search">Search</button>
        </div>
    </div>
);
}

export default SearchBar