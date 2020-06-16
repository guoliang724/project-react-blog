import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectList from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    types: [],
  };

  validateAll = (items, schema) => {
    let errors = {};
    let { error } = Joi.validate(items, schema, { abortEarly: false });
    if (!error) return null;
    else for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = (input, schema) => {
    let mySchema = {
      [input.name]: schema[input.name],
    };
    let errors = {};
    let obj = {
      [input.name]: input.value,
    };

    let { error } = Joi.validate(obj, mySchema);
    if (error) errors[input.name] = error.details[0].message;
    //console.log("validateAll", errors);
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.validateProperty(input, this.schema);
    //console.log("validateProperty", errors);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateAll(this.state.data, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;
    //
    this.doSubmit();
    console.log("does submit!");
  };
  renderInput = (name, label, isDisabled = false) => {
    const { errors, data } = this.state;
    return (
      <Input
        isDisabled={isDisabled}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors}
      />
    );
  };
  renderSelect = (name, label) => {
    const { errors, types, data } = this.state;
    return (
      <SelectList
        errors={errors}
        name={name}
        value={data[name]}
        options={types}
        label={label}
        onChange={this.handleChange}
      />
    );
  };
  renderTextArea = (name, label, isDisabled = false) => {
    const { data, errors } = this.state;
    return (
      <div className="form-group mb-3">
        <label htmlFor={name}>{label}</label>
        <textarea
          disabled={isDisabled}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          className="form-control"
          aria-label="With textarea"
          rows="10"
        ></textarea>
        {errors[name] && (
          <div className="alert alert-primary">{errors[name]}</div>
        )}
      </div>
    );
  };
  renderButton = (label) => {
    return (
      <button
        disabled={this.validateAll(this.state.data, this.schema) ? true : false}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };
}

export default Form;
