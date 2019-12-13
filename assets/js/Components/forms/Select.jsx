import React from "react";
const Select = ({ name, value, error = "", label, onChange, children }) => {
  return (
    <div className="form">
      <label htmlFor="{name">{label}</label>
      <select
        className={"form-control" + (error && " is-invalid")}
        onChange={onChange}
        name={name}
        id={name}
        value={value}
      >
        {children}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Select;
