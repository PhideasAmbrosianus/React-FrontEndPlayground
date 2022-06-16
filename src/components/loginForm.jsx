import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is required.";

    if (account.password.trim() === "")
      errors.password = "Password is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is required.";
      // ... other rules possible
    }

    if (name === "password") {
      if (value.trim() === "") return "Password is required.";
    }
  };

  handleSubmit = (e) => {
    e.preventDefault(); //Prevents default behaviour of this event

    const errors = this.validate(); //Client side validate
    this.setState({ errors: errors || {} }); //If errors is truthy, it gets set, otherwise empty object
    if (errors) return;

    // Call the server

    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name]; //Clear property if no error

    const account = { ...this.state.account };
    account[input.name] = input.value; //currentTarget = input field
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={handleChange}
            autoFocus="autoFocus"
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
