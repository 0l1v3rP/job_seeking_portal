import React from 'react'
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../pages/Home/Home';
import Footer from './Footer';
import UserForm from '../pages/UserForm/UserForm';
import AvailableJobs from '../pages/AvailableJobs/AvailableJobs';
import { useAuth } from './AuthProvider';
import JobOffers from '../pages/JobOffers/JobOffers';
export default function Router() {
  
    const { authState } = useAuth();
      
    if (authState.isSignedIn === null || authState.companyStatus === null) {
        return ;
    }

    const Layout = () => {
        return (
            <>
            <Navbar/>
            <Outlet/>
            <Footer/>
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
