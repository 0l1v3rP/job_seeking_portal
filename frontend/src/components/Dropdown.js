import React from 'react';
import "./Dropdown.css";

function Dropdown() {

    const dropdownSections = [
        {
          title: 'KRAJE',
          items: ['Žilinsky', 'Kosicky', 'Prešovský', 'Trenčianský', 'Nitrianský', 'Trnavský', 'Banskobytrický']
        },
        {
          title: 'PRACOVNÝ POMER',
          items: ['plný uväzok', 'živnosť', 'skratený uväzok']
        }
      ];
      
      const dropDownStyle = {
          color: 'black',
          backgroundColor: 'yellow',
          fontWeight: 'bold'
      }

    return (
    <div className='dropDownContainer'>
      {dropdownSections.map((section, index) => (
        <ul key={index} className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 border-0 dropDown">
          <li>
            <a className="dropdown-item rounded-2 active" style={dropDownStyle}>
              {section.title}
            </a>
          </li>
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <a className="dropdown-item rounded-2">
                {item}  
              </a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default Dropdown;
