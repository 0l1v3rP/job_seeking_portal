import React, { useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  useEffect(() => {
    window.addEventListener('resize', function() {
      if (window.innerWidth > 720) {
        document.querySelector('.navbar-collapse').classList.remove('show');
      }
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
        <img src="./JSPwebIcon.png" width="40" height="32" alt="..." />
      </a>
      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse" id="navbarToggler">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/jobs">Jobs</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/offer-a-job">Offer A Job</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register" >Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
