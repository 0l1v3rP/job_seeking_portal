import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useAuth } from './AuthProvider';
import SignOutModal from './SingOutModal';
import DeleteModal from './DeleteAcc';

function Navbar() {
  const { isSignedIn } = useAuth();

  const [showSignOut, setShowSignOut] = useState(false);
  const openShowSignOut = () => setShowSignOut(true);
  const closeShowSignOut = () => setShowSignOut(false);

  const [showDeleteAcc, setDeleteAcc] = useState(false);
  const openShowDeleteAcc = () => setDeleteAcc(true);
  const closeShowDeleteAcc = () => setDeleteAcc(false);

  useEffect(() => {
    window.addEventListener('resize', function() {
      if (window.innerWidth > 720) {
        document.querySelector('.navbar-collapse').classList.remove('show');
      }
    });
  }, []);

  return (
    <>
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
            {isSignedIn !== null && (
              isSignedIn ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User
                  </a>
                  <div className="dropdown-menu" aria-labelledby="userDropdown">
                    <a className="dropdown-item" onClick={openShowSignOut}>Sign Out</a>
                    <a className="dropdown-item" onClick={openShowDeleteAcc}>Delete Account</a>
                    <a className="dropdown-item" href="/edit">Edit Account</a>
                  </div>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
              )
            )}

          </ul>
        </div>
      </nav>
      {showSignOut && <SignOutModal handleClose={closeShowSignOut} />}
      {showDeleteAcc && <DeleteModal handleClose={closeShowDeleteAcc} />}
    </>
  );
}

export default Navbar;
