import React from 'react'
import "./Dropdown.css";
function Dropdown() {
  return (
    <div className='dropDownContainer'>
    
    <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 border-0 dropDown" >
        <li><a className="dropdown-item rounded-2 active"  style={{color:'black', backgroundColor:'yellow', fontWeight:'bold'}}>KRAJE</a></li>
        <li><a className="dropdown-item rounded-2" >Žilinsky</a></li>
        <li><a className="dropdown-item rounded-2" >Kosicky</a></li>
        <li><a className="dropdown-item rounded-2" >Prešovský</a></li>
        <li><a className="dropdown-item rounded-2" >Trenčianský</a></li>
        <li><a className="dropdown-item rounded-2" >Nitrianský</a></li>
        <li><a className="dropdown-item rounded-2" >Trnavský</a></li>
        <li><a className="dropdown-item rounded-2" >Banskobytrický</a></li>

    </ul>
    <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 border-0 dropDown" >
        <li><a className="dropdown-item rounded-2 active"  style={{color:'black', backgroundColor:'yellow', fontWeight:'bold'}}>PRACOVNÝ POMER</a></li>
        <li><a className="dropdown-item rounded-2" >plný uväzok</a></li>
        <li><a className="dropdown-item rounded-2" >živnosť</a></li>
        <li><a className="dropdown-item rounded-2" >skratený uväzok</a></li>
    </ul>   
    </div> 
    )
}

export default Dropdown