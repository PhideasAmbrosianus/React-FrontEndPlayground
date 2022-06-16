import React from "react";

const MovieDetails = ({ match }) => {
  return <h1>MovieID: {match.params.id} </h1>;
};

export default MovieDetails;
