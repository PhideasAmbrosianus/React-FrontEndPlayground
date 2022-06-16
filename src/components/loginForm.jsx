import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef(); //Creates a vDOM ref object

  handleSubmit = (e) => {
    e.preventDefault(); //Prevents default behaviour of this event

    // Call the server
    // const username = document.getElementById('username').value; // <- This works normally, but don't do this in REACT. React is all about the virtual DOM not the actual DOM
    const username = this.username.current.value; // If you really need to access the DOM this is the method. There is a better way for Forms, learning this next.
    // Minimize use of refs - third party DOM libs, focus control, or animations. Don't overuse them.

    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              ref={this.username}
              id="username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
