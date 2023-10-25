import React from 'react'
import "./Dropdown.css";
function Dropdown() {
  return (
    <div className='dropDownContainer'>
    
    <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 border-0 dropDown" >
        <li><a className="dropdown-item rounded-2 active" href="#" style={{color:'black', backgroundColor:'yellow', fontWeight:'bold'}}>KRAJE</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Žilinsky</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Kosicky</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Prešovský</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Trenčianský</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Nitrianský</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Trnavský</a></li>
        <li><a className="dropdown-item rounded-2" href="#">Banskobytrický</a></li>

    </ul>
    <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 border-0 dropDown" >
        <li><a className="dropdown-item rounded-2 active" href="#" style={{color:'black', backgroundColor:'yellow', fontWeight:'bold'}}>PRACOVNÝ POMER</a></li>
        <li><a className="dropdown-item rounded-2" href="#">plný uväzok</a></li>
        <li><a className="dropdown-item rounded-2" href="#">živnosť</a></li>
        <li><a className="dropdown-item rounded-2" href="#">skratený uväzok</a></li>
    </ul>   
    </div> 
    )
}

export default Dropdown