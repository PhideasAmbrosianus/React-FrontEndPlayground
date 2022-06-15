import React, { Component } from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.isLiked) classes += "-o";

  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    ></i>
  );
};

export default Like;
