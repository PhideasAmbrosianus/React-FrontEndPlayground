import React, { Component } from "react";

class Like extends Component {
  getClass() {
    let likeClass = "fa fa-heart";
    return (likeClass += this.props.isLiked ? "" : "-o");
  }

  render() {
    return (
      <i
        className={this.getClass()}
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
      ></i>
    );
  }
}

export default Like;
