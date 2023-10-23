import React from 'react';
import Carousel from '../Carousel';
import SearchBar from '../SearchBar';
import '../../App.css';
import BestEmployeers from '../BestEmployeers';

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