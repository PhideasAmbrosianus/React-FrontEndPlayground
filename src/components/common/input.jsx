import React, { Component } from "react";

const Input = ({ name, label, value, onChange, autoFocus }) => {
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
    </div>
  );
};

Input.defaultProps = {
  autoFocus: "",
};

export default Input;
