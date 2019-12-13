import React from "react";

/**
 * Pour crée un champ le composant à besoin de
 *  name, label, value, onChange, placeholder, type, error
 *
 */

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error = ""
}) => (
  <div className="from-group">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className={"form-control" + (error && " is-invalid")}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
    {error && <p className="invalid-feedback">{error}</p>}
  </div>
);

export default Field;
