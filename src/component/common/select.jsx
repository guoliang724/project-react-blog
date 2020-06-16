import React, { Component } from "react";

class SelectList extends Component {
  render() {
    const { name, label, value, onChange, errors, options } = this.props;
    return (
      <div className="form-group mb-3">
        <div>
          <label htmlFor={name}>{label}</label>
        </div>
        <select
          value={value}
          onChange={onChange}
          className="form-control"
          id={name}
          name={name}
        >
          <option value=""></option>
          {options.map((option, index) => (
            <option key={index} value={option[name]}>
              {option[name]}
            </option>
          ))}
        </select>

        {errors[name] && (
          <div className="alert alert-primary">{errors[name]}</div>
        )}
      </div>
    );
  }
}

export default SelectList;
