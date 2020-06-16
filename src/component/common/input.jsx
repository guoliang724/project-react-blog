import React, { Component } from "react";

class Input extends Component {
  render() {
    const { name, value, label, onChange, errors, isDisabled } = this.props;
    return (
      <div className="form-group mt-3">
        <label htmlFor={name}>{label}</label>
        <input
          disabled={isDisabled}
          value={value}
          onChange={onChange}
          type={name}
          className="form-control"
          id={name}
          name={name}
          aria-describedby="emailHelp"
        ></input>
        {errors[name] && (
          <div className="alert alert-primary">{errors[name]}</div>
        )}
      </div>
    );
  }
}

export default Input;
