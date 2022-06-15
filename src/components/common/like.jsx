import React from "react";
import PropTypes from "prop-types";

const Like = ({ isLiked, onClick }) => {
  let classes = "fa fa-heart";
  if (!isLiked) classes += "-o";

  return (
    <i className={classes} style={{ cursor: "pointer" }} onClick={onClick}></i>
  );
};

Like.propTypes = {
  isLiked: PropTypes.bool,
};

export default Like;
