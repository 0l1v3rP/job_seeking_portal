import React from 'react';

export default function FormField({ label, name, type, value, error, onChange })  {
    return (
    <div className="col-sm-6">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      type={type}
      name={name}
      className={`form-control registerInputs ${error && 'is-invalid'}`}
      id={name}
      value={value}
      onChange={onChange}
    />
    <div className="invalid-feedback">
      {error}
    </div>
    </div>
    );
}