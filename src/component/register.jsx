import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Regist from "../services/register";
import auth from "../services/auth";
class Register extends Form {
  state = {
    data: {
      email: "",
      password: "",
      author: "",
    },
    errors: {},
  };
  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).required().label("Password"),
    author: Joi.string().min(2).required().label("Name"),
  };
  async doSubmit() {
    try {
      const response = await Regist(this.state.data);
      auth.loginWithjwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === (404 || 400)) {
        let errors = { ...this.state.errors };
        console.log("test errors", errors);
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email Address")}
        <small id="email" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
        {this.renderInput("password", "Password")}
        {this.renderInput("author", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default Register;
