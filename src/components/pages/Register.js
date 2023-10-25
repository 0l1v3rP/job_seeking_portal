import React from 'react'
import '../../App.css' ;
import './Register.css';
function Register() {
  return (
    <>
    
    <p className='Title'>MAKE YOUR REGISTRATION</p>
    <div className="row g-3 register">          
            <div className="col-sm-6">
              <label for="firstName" className="form-label">First name</label>
              <input type="text" className="form-control registerInputs" id="firstName" placeholder="" value="" required=""/>
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>

            <div className="col-sm-6">
              <label for="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control registerInputs" id="lastName" placeholder="" value="" required=""/>
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div className="col-sm-6">
              <label for="username" className="form-label">Username</label>
              <div className="input-group has-validation">
                <span className="input-group-text registerInputs">@</span>
                <input type="text" className="form-control registerInputs" id="username" placeholder="Username" required=""/>
              <div className="invalid-feedback">
                  Your username is required.
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <label for="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
              <input type="email" className="form-control registerInputs" id="email" placeholder="you@example.com"/>
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="col-sm-6">
              <label for="address" className="form-label">Address</label>
              <input type="text" className="form-control registerInputs" id="address" placeholder="1234 Main St" required=""/>
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="col-sm-6">
              <label for="address2" className="form-label">Address 2 <span className="text-body-secondary">(Optional)</span></label>
              <input type="text" className="form-control registerInputs" id="address2" placeholder="Apartment or suite"/>
            </div>

            <div className="col-md-5">
              <label for="country" className="form-label">Country</label>
              <select className="form-select registerInputs" id="country" required="">
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div className="col-md-4">
              <label for="state" className="form-label">State</label>
              <select className="form-select registerInputs" id="state" required="">
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div className="col-md-3">
              <label for="zip" className="form-label">Zip</label>
              <input type="text" className="form-control registerInputs" id="zip" placeholder="" required=""/>
              <div className="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div> 
          <br/>
          <button className=" btn-register">Register</button>

          </>
      );
}

export default Register