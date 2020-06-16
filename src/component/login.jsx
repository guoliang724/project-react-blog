import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import auth from "../services/auth";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    try {
      const { email, password } = this.state.data;
      await auth.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === (400 || 404)) {
        const errors = { ...this.state.errors };
        console.log("response", ex.response);
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email Address")}
        {this.renderInput("password", "Password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

export default Login;
