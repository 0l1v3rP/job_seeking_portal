import React from 'react'
import { BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Footer from './Footer';
import Register from '../pages/Register/Register';
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
                        <Route path="/Register" element={<Register />}></Route>
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
