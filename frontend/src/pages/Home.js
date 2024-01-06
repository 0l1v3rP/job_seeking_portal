import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import '../App.css';
import BestEmployeers from '../components/BestEmployeers';
import SignInModal from '../modals/SignInModal';
import { useAuth } from '../components/AuthProvider';

function Home() {

  
  const { authState } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (authState.isSignedIn !== null) {
      setShow(!authState.isSignedIn);
    }
  }, [authState.isSignedIn]);

  if (authState.isSignedIn === null) {
    return ;
  }

  const handleCloseModal = () => setShow(false);

    return (
        <div>
            <p className='Title'>FIND YOUR DREAM JOB, APPLY NOW !!</p>
            <Carousel/>
            <br/>
            <SearchBar/>
            <br/>
            <p className='top border-bottom' style={{padding:20}}>Top Employeers</p>
            <BestEmployeers/>
            <SignInModal show={show} handleClose={handleCloseModal}/>
        </div>
    );
}

export default Home;