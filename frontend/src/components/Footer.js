import React from 'react'
import './Footer.css'
function Footer() {
  const footerItems = ['Home', 'Features', 'Pricing', 'FAQs', 'About'];

  return (
    <footer className="py-3 my-4 bg-dark footer" >
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        {footerItems.map((item, index) => (
          <li key={index} className="nav-item">
            <a className="nav-link px-2 text-body-secondary">{item}</a>
          </li>
        ))}
      </ul>
      <p className="text-center text-body-secondary">© 2023 Company, Inc</p>
    </footer>
  );
}


export default Footer