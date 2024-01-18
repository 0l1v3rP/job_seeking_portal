import React from 'react'
import { useState, useEffect } from 'react';
export default function CountryFormField({value, error, onChange})  {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await fetch("https://restcountries.com/v2/all");
          const data = await response.json();
          setCountries(data);
        } catch (e) {
          console.error('Error fetching countries:', e);
        }   
      };
      fetchCountries();
    }, []); 
  return (
    <div className="col-sm-6">
    <label htmlFor="country" className="form-label">Country</label>
    <select 
        className={`form-control registerInputs ${error && 'is-invalid'}`}
        id="country" 
        name='country' 
        value={value} 
        onChange={onChange}
    >
    <option value="">Choose...</option>
        {countries.map((country) => (
          <option key={country.alpha2Code}>
            {country.name}
          </option>
        ))}
    </select>
    <div className="invalid-feedback">
      {error}
    </div>
  </div>
    )
}
