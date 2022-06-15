import React from "react";
import Like from "./common/like";

const MoviesTable = (props) => {
  const { movies, onLikeClick, onDelete } = props;

  const tableCols = ["Title", "Genre", "Stock", "Rate"];

  return (
    <table className="table">
      <thead>
        <tr>
          {tableCols.map((name) => (
            <th scope="col" key={name}>
              {name}
            </th>
          ))}
          <th scope="col" key="delete"></th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Like
                isLiked={movie.isLiked}
                onClick={() => onLikeClick(movie)}
              />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
