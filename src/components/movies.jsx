import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import Filter from "./common/filter";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    tableCols: ["Title", "Genre", "Stock", "Rate"],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  debug() {
    console.log(this.state.movies);
  }

  renderMoviesList() {
    return;
  }

  //This was my first cut
  // handleDelete(index) {
  //   //console.log("click", index);
  //   this.setState({
  //     movies: [
  //       ...this.state.movies.slice(0, index),
  //       ...this.state.movies.slice(index + 1),
  //     ],
  //   });
  // }

  //And a better way is to use filter with an arrow function - simpler code
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLikeClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>No Movies in Database!</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              <Filter clearFilterLabel="All Genres" items={this.state.genres} />
            </div>
            <div className="col">
              <span>
                Showing {this.state.movies.length} movies in the database.
              </span>
              <table className="table">
                <thead>
                  <tr>
                    {this.state.tableCols.map((name) => (
                      <th scope="col" key={name}>
                        {name}
                      </th>
                    ))}
                    <th scope="col" key="delete"></th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie, index) => (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          isLiked={movie.isLiked}
                          onClick={() => this.handleLikeClick(movie)}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
