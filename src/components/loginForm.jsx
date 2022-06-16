import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    const errors = {};
    error.details.map((item) => (errors[item.path[0]] = item.message));

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] }; // Apply the schema value for this object defined in parent schema
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
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
