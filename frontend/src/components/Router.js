import React from 'react'
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Footer from './Footer';
import UserForm from '../pages/UserForm/UserForm';
import Jobs from '../pages/Jobs';
export default function Router() {
  
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
                        <Route path="/Jobs" element={<Jobs />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRoutes/>
     )
}
