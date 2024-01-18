import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useAuth, setCompanyStatusState, SetSignInState } from './AuthProvider';
import SignOutModal from '../modals/SingOutModal';
import { companyStatusEnum } from '../utils/constants/companyStatus';
import RegisterCompanyModal from '../modals/registerCompanyModal';
import DeleteModalGeneric from '../modals/DeleteModalGeneric';

function Navbar() {
  const { authState, setAuthState } = useAuth();

  const [showSignOut, setShowSignOut] = useState(false);
  const openShowSignOut = () => setShowSignOut(true);
  const closeShowSignOut = () => setShowSignOut(false);

  const [showDeleteAcc, setDeleteAcc] = useState(false);
  const openShowDeleteAcc = () => setDeleteAcc(true);
  const closeShowDeleteAcc = () => setDeleteAcc(false);

  const [showRegisterCompany, setRegisterCompany] = useState(false);
  const openShowRegisterCompany = () => setRegisterCompany(true);
  const closeShowRegisterCompany = () => setRegisterCompany(false);

  const [showDeleteCompany, setDeleteCompany] = useState(false);
  const openShowDeleteCompany = () => setDeleteCompany(true);
  const closeShowDeleteCompany = () => setDeleteCompany(false);


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
              <a className="nav-link" href="/AvailableJobs">Available Jobs</a>
            </li>
            {authState.isSignedIn !== null && (
              authState.isSignedIn ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User
                  </a>
                  <div className="dropdown-menu" aria-labelledby="userDropdown">
                    <a className="dropdown-item" onClick={openShowSignOut}>Sign Out</a>
                    <a className="dropdown-item" onClick={openShowDeleteAcc}>Delete Account</a>
                    <a className="dropdown-item" href="/Userform">Edit Account</a>

                  </div>
                </li>
                 <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="companyDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Company
                  </a>
                  <div className="dropdown-menu" aria-labelledby="companyDropdown">
                    {authState.companyStatus === companyStatusEnum.NONE ? (
                        <a className="dropdown-item" onClick={openShowRegisterCompany}>Register Company</a>
                      ) : (
                        <>
                        {/* <a className="dropdown-item" onClick={openShowSignOut}>Edit Company</a> */}
                        <a className="dropdown-item" onClick={openShowDeleteCompany}>Delete Company</a>
                        {/* <a className="dropdown-item" href="/Userform">Edit Account</a> */}
                          {/* Company business */}
                        </>
                      )}
                    {/* {authState.companyStatus !== companyStatusEnum.NONE &&
                        <>
                        </> // menu of job offers:
                              //  view job offers
                              // create job offer
                              //RENDER THIS MENU NEXT TO COMPANY MENU
                    } */}
                  </div>
                </li>
                 {/* { authState.companyStatus !== companyStatusEnum.NONE && ( */}
                 <li className="nav-item ">
                  <a className="nav-link" href="/JobOffers">Jobs</a>
                </li>
                {/* )} */}
              </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/Userform">Register</a>
                </li>
              )
            )}
          </ul>
        </div>
      </nav>
      {showSignOut && <SignOutModal handleClose={closeShowSignOut} />}
      {showDeleteAcc && <DeleteModalGeneric handleClose={closeShowDeleteAcc} endpoint={'deleteaccount'} type={'Account'} action={() => {SetSignInState(setAuthState, false)}} />}
      {showRegisterCompany && <RegisterCompanyModal show={true} handleClose={closeShowRegisterCompany} />}
      {showDeleteCompany && <DeleteModalGeneric  handleClose={closeShowDeleteCompany} endpoint={'deletecompany'} type={'Company'} action={() => {setCompanyStatusState(setAuthState, companyStatusEnum.NONE)}} />}
    </>
  );
}

export default Navbar;
