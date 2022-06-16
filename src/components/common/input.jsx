import React, { Component } from "react";

const Input = ({ name, label, value, onChange, autoFocus, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        className="form-control"
        autoFocus={autoFocus}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.defaultProps = {
  autoFocus: "",
};

export default Input;
