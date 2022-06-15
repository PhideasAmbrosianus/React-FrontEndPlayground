import React from "react";
import PropTypes from "prop-types";

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

Like.propTypes = {
  isLiked: PropTypes.bool,
};

export default Like;
