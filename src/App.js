import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Footer from './components/Footer';
import Register from './components/pages/Register';
import Jobs from './components/pages/Jobs';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Jobs" element={<Jobs />}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
