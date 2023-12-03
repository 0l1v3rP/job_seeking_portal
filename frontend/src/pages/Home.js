import React from 'react';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import '../App.css';
import BestEmployeers from '../components/BestEmployeers';
import SignInModal from '../components/SignInModal';
import { useState, useEffect } from 'react';


function Home() {

    const [isSignedIn, setSignedIn] = useState(false);

    // const handleShowSignInModal = () => setSignedIn(false);
    const handleCloseSignInModal = () => setSignedIn(true);

    async function checkSignInStatus() {
        try {
          const response = await fetch('http://localhost:8000/checksigninstatus', {
            method: 'POST'
          }); 
          const data = await response.json();
          return data.isLoggedIn;
        } catch (error) {
          console.error('Error checking sign-in status:', error);
          return false;
        }
      }

    useEffect(() => {
        async function fetchSignInStatus() {
            const status = await checkSignInStatus();
            setSignedIn(status);
        }
        fetchSignInStatus();
    }, []);
    

    return (
        <div>
            <p className='Title'>FIND YOUR DREAM JOB, APPLY NOW !!</p>
            <Carousel/>
            <br/>
            <SearchBar/>
            <br/>
            <p className='top border-bottom' style={{padding:20}}>Top Employeers</p>
            <BestEmployeers/>
            <SignInModal show={!isSignedIn} handleClose={handleCloseSignInModal} />
        </div>
    );
}

export default Home;