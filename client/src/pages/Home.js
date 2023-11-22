import React from 'react';
import Carousel from '../components/Carousel';
import SearchBar from '../components/SearchBar';
import '../App.css';
import BestEmployeers from '../components/BestEmployeers';

function Home() {
    return (
        <div>
            <p className='Title'>FIND YOUR DREAM JOB, APPLY NOW !!</p>
            <Carousel/>
            <br/>
            <SearchBar/>
            <br/>
            <p className='top border-bottom' style={{padding:20}}>Top Employeers</p>
            <BestEmployeers/>
        </div>
    );
}

export default Home;