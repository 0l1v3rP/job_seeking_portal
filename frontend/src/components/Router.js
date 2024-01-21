import React from 'react'
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../pages/Home/Home';
import Footer from './Footer';
import UserForm from '../pages/UserForm/UserForm';
import AvailableJobs from '../pages/AvailableJobs/AvailableJobs';
import { useAuth } from '../contexts/AuthProvider';
import JobOffers from '../pages/JobOffers/JobOffers';
import Toasts from './Toasts';
import './Router.css'

export default function Router() {

  
    const { authState } = useAuth();
      
    if (authState.isSignedIn === null || authState.companyStatus === null) {
        return ;
    }

    const Layout = () => {
        return (
            <>
                <div className='main-content-wrapper'>
                    <div className='content-wrapper'>
                        <Navbar />
                        <Outlet />
                    </div>
                    <Footer />
                    <Toasts />
                </div>
            </>
        )
    }

    const BrowserRoutes =() => {
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/Userform" element={<UserForm />}></Route>
                        <Route path="/AvailableJobs" element={<AvailableJobs />}></Route>
                        {authState.isSignedIn && <Route path="/JobOffers" element={<JobOffers/>}></Route> }
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRoutes/>
     )
}
