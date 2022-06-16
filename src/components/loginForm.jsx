import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault(); //Prevents default behaviour of this event

    // Call the server
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value; //currentTarget = input field
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            autoFocus="autoFocus"
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
